const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    
    fName: {
        type: String,
        required: true,
        trim:true
    },
    lName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    userName: {
        type: String,
        required: true,
        trim:true
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    image: {
        type: String,
        required: true,
        trim:true
    },
    role: { type: String, enum: ['UNKNOWN','USER', 'ARTIST',"ADMIN"], default: 'UNKNOWN' },
    emailVerified: { type: Boolean, default: false },
    emailVerifyCode: { type: String, required: false },
   

},{ timestamps: true })

const UserModel = mongoose.model("user", userSchema);
module.exports=UserModel