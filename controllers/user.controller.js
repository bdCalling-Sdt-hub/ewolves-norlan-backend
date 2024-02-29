const UserModel =require("../models/userSchema")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const emailWithNodemailer = require("../config/email.config");

const userTimers = new Map();


exports.userRegister = async (req,res) => {

    try{
        if (req.fileValidationError) {
            return res.status(400).json({ "messege": req.fileValidationError });
        }
        //res.json("tushar")
        //console.log(typeof(JSON.parse(req.body.termAndCondition)))
        const { fullName, email,password,confirmPass,mobileNumber,location,instagramLink,aboutUs,termAndCondition} = req.body
        console.log(fullName, email,password,confirmPass,termAndCondition)

        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(409).send({ "messege": "email already exists" });

        }else{
            if(fullName && email && password && confirmPass){
                if(password !== confirmPass){
                  
                    return res.status(400).send({ "status": 400, "messege": "password and confirm password does not match" })

                }
                else{
                   
                   try{
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(password, salt);
                    //console.log(req.files.image[0]);
                    //return res.json(req.files.image[0].filename)
                    let imageFileName = '';

                    if (req.files.image[0]) {
                        // Add public/uploads link to the image file

                        imageFileName = `/upload/image/${req.files.image[0].filename}`;
                    }
                  
                    const emailVerifyCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                   
                    const user = await UserModel.create({
                        fullName,
                        email,
                        password: hashpassword,
                        termAndCondition:JSON.parse(termAndCondition),
                        emailVerifyCode,
                        
                      
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
                            console.error(`Error updating emailverify code for user ${user?._id}:`, error);
                        }
                    }, 180000); // 3 minutes in milliseconds

                    // Store the timer reference in the map
                    userTimers.set(user?._id, userTimer);
                    //console.log(user._id);
                    const secretid = process.env.JWT_SECRET;
                    //console.log(secretid);
                    const token = jwt.sign({ userID: user?._id }, secretid, { expiresIn: "30m" })

                    const link = `http://192.168.10.13:5000/email-verify/${user?._id}/${token}`

                    const emailData = {
                        email,
                        subject: 'Account Activation Email',
                        html: `
                            <h1>Hello, ${user?.fullName}</h1>
                            <p>Your Email verify link is <h3>${link}</h3> to verify your email</p>
                            <small>This Code is valid for 3 minutes</small>
                            `
                    }

                    emailWithNodemailer(emailData);
                    return res.status(201).send({ "status": 201, "messege": "Registerd successfully!Please check your E-mail to verify.", "link": link })

                    } catch(err){
                        console.log(e)
                        return res.status(400).send({ "status": 400, "messege": "unable to register" })
                   }
                }
            }else{
                return res.status(400).send({ "status": 400, "messege": "All fields are required" })
            }
        }

    }catch(err){

    }
}