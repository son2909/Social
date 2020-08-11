const mongoose = require('mongoose');

const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let FeedImageSchema = new mongoose.Schema({
  feedId: { type: mongoose.Schema.Types.ObjectId, ref: 'feed' },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  url: { type: String, default: '' },
  thumbnail : { type: String, default: '' }
}, schemaOptions);

module.exports = mongoose.model("feed_image", FeedImageSchema);