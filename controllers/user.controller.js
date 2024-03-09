const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailWithNodemailer = require("../config/email.config");

const userTimers = new Map();

exports.userRegister = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ messege: req.fileValidationError });
    }

    const {
      fullName,
      email,
      password,
      confirmPass,
      mobileNumber,
      location,
      instagramLink,
      aboutUs,
      termAndCondition,
      role,
    } = req.body;
    console.log(fullName, email, password, confirmPass, termAndCondition);

    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(409).send({ messege: "email already exists" });
    } else {
      if (fullName && email && password && confirmPass) {
        if (password !== confirmPass) {
          return res
            .status(400)
            .send({
              status: 400,
              messege: "password and confirm password does not match",
            });
        } else {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);

            let imageFileName = "";
            console.log(imageFileName);
            if (req.files && req.files.image && req.files.image[0]) {
              // Add public/uploads link to the image file

              imageFileName = `/media/${req.files.image[0].filename}`;
            }

            const emailVerifyCode =
              Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

            const user = await UserModel.create({
              fullName,
              email,
              password: hashpassword,
              termAndCondition: JSON.parse(termAndCondition),
              emailVerifyCode,
              role: role,
              image: !imageFileName
                ? "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708560000&semt=sph"
                : imageFileName,
            });

            if (userTimers.has(user?._id)) {
              clearTimeout(userTimers.get(user?._id));
            }
            const userTimer = setTimeout(async () => {
              try {
                user.oneTimeCode = null;
                await user.save();
                //console.log(`email verify code for user ${user._id} reset to null after 3 minutes`);
                // Remove the timer reference from the map
                userTimers.delete(user?._id);
              } catch (error) {
                console.error(
                  `Error updating emailverify code for user ${user?._id}:`,
                  error
                );
              }
            }, 180000); // 3 minutes in milliseconds

            // Store the timer reference in the map
            userTimers.set(user?._id, userTimer);
            //console.log(user._id);
            //console.log(secretid);
            // const token = jwt.sign({ userID: user?._id }, secretid, { expiresIn: "30m" })

            // const link = `http://192.168.10.13:5000/email-verify/${user?._id}/${token}`

            const emailData = {
              email,
              subject: "Account Activation Email",
              html: `
                            <h1>Hello, ${user?.fullName}</h1>
                            <p>Your email verified code is <h3>${emailVerifyCode}</h3> to verify your email</p>
                            <small>This Code is valid for 3 minutes</small>
                            `,
            };

            emailWithNodemailer(emailData);
            return res.status(201).send({
              status: 201,
              messege:
                "Registerd successfully!Please check your E-mail to verify.",
            });
          } catch (err) {
            console.log(e);
            return res
              .status(400)
              .send({ status: 400, messege: "unable to register" });
          }
        }
      } else {
        return res
          .status(400)
          .send({ status: 400, messege: "All fields are required" });
      }
    }
  } catch (err) {
    return res.status(400).send({ status: 400, messege: "unable to register" });
  }
};

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

            return res.status(200).send({
              status: 200,
              messege: "you are logged in successfully",
              token: token,
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

exports.loggeduserdata = async (req, res, next) => {
  try {
    const userData = await UserModel.findById(req.user._id);
    console.log("tushar", userData);
    let identity = userData.role == "admin" ? true : false;
    const user = await UserModel.findById({ _id: req.user?._id }).select([
      "fullName",
      "email",
      "userName",
      "image",
      "role",
    ]);

    return res.status(200).send({
      status: 200,
      messege: "User information Retrive successfully",
      data: { userInfo: user },
    });
  } catch (e) {
    next(e.message);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    console.log(email);

    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    //return res.json(user)
    if (!user) {
      return res.status(400).json({ message: "User not found" });
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

    res.status(201).json({ message: "Sent email Verify Code successfully" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    } else {
      if (password !== confirmPassword) {
        return res
          .status(400)
          .send({ messege: "password and confirm password does not match" });
      } else {
        if (user.emailVerified === true) {
          const salt = await bcrypt.genSalt(10);
          const hashpassword = await bcrypt.hash(password, salt);
          user.password = hashpassword;
          user.emailVerifyCode = null;
          await user.save();
          res.status(200).json({ message: "Password updated successfully" });
        } else {
          res.status(200).json({
            message: "Something went wrong, try forget password again",
          });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error updating password" });
  }
};

exports.changeuserpassword = async (req, res) => {
  const { currentPass, newPass, confirmPass } = req.body;
  const userData = await UserModel.findById(req.user._id);
  const ismatch = await bcrypt.compare(currentPass, userData.password);
  if (!ismatch) {
    return res
      .status(400)
      .send({ status: 400, messege: "Current password is wrong" });
  }
  if (currentPass == newPass) {
    return res
      .status(400)
      .send({
        status: 400,
        messege: "Current password and new password must be difference",
      });
  }
  if (newPass && confirmPass) {
    if (newPass !== confirmPass) {
      return res.status(400).send({
        status: 400,
        messege: "password and confirm password doesnt match",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(newPass, salt);
      const passchange = await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: hashpassword },
      });
      //console.log(passchange)
      return res
        .status(200)
        .send({ status: 200, messege: "password changed successfully" });
    }
  } else {
    return res
      .status(400)
      .send({ status: 400, messege: "All fields are required" });
  }
};

exports.profileEdit = async (req, res, next) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ messege: req.fileValidationError });
    }

    const { fullName, profession, location, instagram, aboutUs, mobileNumber } =
      req.body;
    const userData = await UserModel.findById(req.user._id);
    console.log(userData);

    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    } else {
    }
  } catch (error) {
    next(error);
  }
};
