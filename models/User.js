let mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const schemaOptions = {
  versionKey: false,
  timestamps: { installed_day: 'created_at' }
};
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatar: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  gender: { type: Number, default: 0 }, // 0: chon, 1:Nam, 2: Nu, 3: khac
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  relationship: { type: Number, default: 0 }, //0: single, 1: married, 2: complex
  story: { type: String, default: '' },
  address: { type: String, default: '' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null }],
  active: { type: Boolean, default: false },
  birthday: { type: String, default: '' },
  expired: { type: Boolean, default: false }
}, schemaOptions);
mongoosePaginate.paginate.options = {
  lean: true,
  limit: 10
};
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", UserSchema);