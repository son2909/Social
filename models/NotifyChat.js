const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let NotifyChatSchema = new mongoose.Schema({
  roomChatId: { type: mongoose.Schema.Types.ObjectId, ref: 'roomChat' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'message' },
  viewed: { type: Boolean, default: false }
}, schemaOptions);


NotifyChatSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notify_chat", NotifyChatSchema);