import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    content: {type: String, required: true},
    createdDate: {type: String, default: Date.now()},
    subComments: {type: [String], required: true},
    level: {type: Number, required: true},
});

const CommentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default CommentModel