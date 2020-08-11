let mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let FeedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: String,
  location: String,
  numberLike: { type: Number, default: 0 },
  numberComment: { type: Number, default: 0 },
  privicy: { type: Number, default: 0 }, // 0: public 1: friends 2 :onlyme,
  usersLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  images : [{ type: mongoose.Schema.Types.ObjectId, ref: 'feed_image'}],

}, schemaOptions);

FeedSchema.plugin(mongoosePaginate);
const Feed = mongoose.model("feed", FeedSchema);
module.exports = Feed;