const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailWithNodemailer = require("../config/email.config");
const catchAsync = require("../shared/CatchAsync");
const sendResponse = require("../shared/sendResponse");
const userTimers = new Map();



exports.verifyEmail = async (req, res, next) => {
  try {
    const { emailVerifyCode, email } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else if (user.emailVerifyCode === emailVerifyCode) {
      user.emailVerified = true;
      await user.save();
      res.status(200).json({ message: "Email veriified successfully" });
    } else {
      res.status(410).json({ message: "Failed to verify" });
    }
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user.role == "ADMIN" || user.role == "USER" || user.role == "ARTIST") {
      if (email && password) {
        if (user.emailVerified === false) {
          return res
            .status(401)
            .send({ status: 401, messege: "your email is not verified" });
        }

        if (user.role === "UNKNOWN") {
          return res
            .status(401)
            .send({ status: 401, messege: "Unathorized user" });
        }

        if (user !== null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (user.email === email && ismatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "3d" }
            );

            return res
              .status(200)
              .send({
                status: 200,
                messege: "you are logged in successfully",
                token: token,
                data: user
              });
          } else {
            return res
              .status(401)
              .send({ status: 401, messege: "your credential doesn't match" });
          }
        } else {
          return res
            .status(401)
            .send({ status: 401, messege: "your credential doesn't match" });
        }
      } else {
        return res
          .status(400)
          .send({ status: 400, messege: "All fields are required" });
      }
    } else {
      return res
        .status(401)
        .send({ status: 401, messege: "You are not authorized user" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, messege: "unable to login" });
  }
};

exports.forgetPassword = catchAsync(async (req, res, next) => {

    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, "User does not exist");
    }

    // Generate OTC (One-Time Code)
    const emailVerifyCode =
      Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    // Store the OTC and its expiration time in the database
    user.emailVerifyCode = emailVerifyCode;
    user.emailVerified = false;
    await user.save();

    // Prepare email for password reset
    const emailData = {
      email,
      subject: "Password Reset Email",
      html: `
        <h1>Hello, ${user.fullName}</h1>
        <p>Your Email verified Code is <h3>${emailVerifyCode}</h3> to reset your password</p>
        <small>This Code is valid for 3 minutes</small>
      `,
    };

    // Send email
    try {
      await emailWithNodemailer(emailData);
    } catch (emailError) {
      console.error("Failed to send verification email", emailError);
    }

    // Set a timeout to update the oneTimeCode to null after 1 minute
    setTimeout(async () => {
      try {
        user.emailVerifyCode = null;
        await user.save();
        console.log("emailVerifyCode reset to null after 3 minute");
      } catch (error) {
        console.error("Error updating EmailVerifyCode:", error);
      }
    }, 180000); // 3 minute in milliseconds

  return sendResponse(res, 200, "Send email Verify Code Successfully");
});

exports.resetPassword = catchAsync(async (req, res, next) => {

  const { email, password, confirmPassword } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return sendResponse(res, 400, "User does not exist");
  }

  if(password !== confirmPassword){
    return sendResponse(res, 400, "Password and confirm password does not match");
  }

  if (user.emailVerified === true) {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    user.password = hashpassword;
    user.emailVerifyCode = null;
    await user.save();
    return sendResponse(res, 200, "Password Updated Successfully", user)
  }

});

exports.changeuserpassword = catchAsync(async (req, res) => {
  const { currentPass, newPass, confirmPass } = req.body;
  const user = await UserModel.findById(req.user._id);

  if(!currentPass && !newPass && !confirmPass){
    return sendResponse(res, 400, "All Fields are required");
  }

  const ismatch = await bcrypt.compare(currentPass, user.password);
  if (!ismatch) {
    return sendResponse(res, 400, "Current Password is Wrong");
  }

  if(currentPass == newPass){
    return sendResponse(res, 400, "Current Password and new password must be different");
  }
  
  if(newPass !== confirmPass){
    return sendResponse(res, 400, "password and confirm password doesnt match");
  }

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(newPass, salt);
  await UserModel.findByIdAndUpdate(req.user._id, {
    $set: { password: hashpassword }
  });

  return sendResponse(res, 400, "Password Changed Successfully");

});



exports.profileEdit=catchAsync(async(req,res,next)=>{

  if (req.fileValidationError) {
    return res.status(400).json({ messege: req.fileValidationError });
  }
  const user = await UserModel.findById(req.user._id);
  if(!user){
    return sendResponse(res, 204, "No User Found", user)
  }
  const {fullName, email, mobileNumber, location }=req.body;

  let imageFileName = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imageFileName = `/media/${req.files.image[0].filename}`;
  }

  const fileName = user?.image?.split("/").pop();
  const filePath = path.join(__dirname, '..', 'uploads', 'media', fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  user.fullName= fullName ? fullName : user.fullName
  user.email= email ? email : user?.email;
  user.mobileNumber= mobileNumber ? mobileNumber : user.mobileNumber
  user.location= location ? location : user.location;
  user.image = imageFileName ? imageFileName : user.image
  await user.save();

  if(!fullName){
    return sendResponse(res, 400, "Full Name is Required")
  }
});
