const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
    {
        conversationId: {
            type: String,
            required: true
        },
        messageType:{
            type: String,
            enum: ["Text", "Deal", "Image"],
            default: "Text",
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

const Message = model('message', MessageSchema);
module.exports = Message;