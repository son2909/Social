const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room_chat' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: String,
  viewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
  type: { type: Number, default: 0 }, //0 :text, 1:image, 2 :file,
}, schemaOptions);

MessageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("message", MessageSchema);