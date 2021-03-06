const mongoose = require('mongoose');


const schemaOptions = {
  versionKey: false,
  timestamps: true
};

let RoomChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null }]
}, schemaOptions);

module.exports = mongoose.model("room_chat", RoomChatSchema);   