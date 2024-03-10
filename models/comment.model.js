const { Schema, Model } = require('mongoose');
const commentModel = new Schema({
    gig:{
        type: Schema.Types.ObjectId,
        ref: "Gig",
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    comment: {
        type: String,
        require: true
    }
})

const CommentModel = Model("Comment", commentModel)
module.exports = CommentModel;