const mongoose = require('mongoose');

const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let CommentChildSchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'comment' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: String
}, schemaOptions);

module.exports = mongoose.model("comment_child", CommentChildSchema);