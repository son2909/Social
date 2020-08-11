const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  feedId: { type: mongoose.Schema.Types.ObjectId, ref: 'feed' },
  content: { type: String },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feed_image', default: null }],
  commentChilds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment_child', default: null }]
}, schemaOptions);

CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("comment", CommentSchema);