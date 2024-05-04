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
        deal:{
            title:{
                type: String,
                default:""
            },
            description:{
                type: String,
                default:""
            },
            status:{
                type: String,
                enum:["pending","confirm","cancel"],
                default:"pending"
            },
            price:{
                type: Number,
                default:0
            },
            quentity:{
                type: Number,
                default:0
            },
            deliveryDate:{
                type: String,
                default: Date.now()
            },
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