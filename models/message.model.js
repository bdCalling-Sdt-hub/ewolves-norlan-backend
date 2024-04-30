const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
    {
        conversationId: {
            type: String,
            required: true
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