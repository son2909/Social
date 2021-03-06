const User = require('../models/User');
const mongoose = require('mongoose');

exports.followUser = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session };
  try {
    let userFrom = await User.find({ _id: data.fromId, followings: { $in: [data.toId] } }).lean().session();
    let userTo = await User.find({ _id: data.toId, followers: { $in: [data.fromId] } }).lean().session();
    if (userFrom.length > 0 && userTo.length > 0) {
      await session.commitTransaction();
      session.endSession();
      return { state: true, msg: 'User is followed !' }
    } else {
      await User.updateOne({
        _id: data.toId
      }, {
        $push: { followers: data.fromId }
      }, opts);
      await User.updateOne({
        _id: data.fromId
      }, {
        $push: { followings: data.toId }
      }, opts);
      await session.commitTransaction();
      session.endSession();
      return { state: true, msg: 'follow user successfully' }
    }

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { state: false, error }
  }
}
exports.unFollowUser = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session };
  try {
    await User.updateOne({
      _id: data.toId
    }, {
      $pull: { followers: data.fromId }
    }, opts);
    await User.updateOne({
      _id: data.fromId
    }, {
      $pull: { followings: data.toId }
    }, opts);
    await session.commitTransaction();
    session.endSession();
    return { state: true, msg: 'unfollow user successfully' }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { state: false, error }
  }
}