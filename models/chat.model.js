const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{ timestamps: true });

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
