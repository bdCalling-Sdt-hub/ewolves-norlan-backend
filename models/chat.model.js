const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image:{
        type: String,
        required: false
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String,
        required: false
    }
},{ timestamps: true });

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
