const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const schemaOptions = {
  versionKey: false,
  timestamps: true
};
let NotifySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  toUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  content: {
    title: String,
    body: String
  },
  viewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
}, schemaOptions);


NotifySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notify", NotifySchema);