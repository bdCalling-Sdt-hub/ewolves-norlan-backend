const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    messageType:{
        type: String,
        required: true,
        enum: ["Text", "Deal", "Image"],
        default: "Text",
    },
    deal: {
       type:{
            title:{
                type: String
            },
            description: {
                type: String
            },
            status: {
                type: String,
                enum: ["Pending", "Complete", "Cancel"],
                default: "Pending"
            }

       }
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{ timestamps: true });

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;