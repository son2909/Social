const Message = require('../models/Message');
const User = require('../models/User');

exports.setMessage = (req, res) => {
  req.checkBody('user_id', 'user_id is required').isMongoId();
  req.checkBody('room_id', 'room_id is required').isMongoId();
  req.checkBody('content', 'content is required').notEmpty();
  req.checkBody('type', 'type is required & is a number').isIn([0, 1, 2]);
  let errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    Message.create({
      roomId: req.body.user_id,
      userId: req.body.user_id,
      content: req.body.content,
      type: req.body.type
    }, (e, r) => {
      if (e) {
        res.status(200).json({ state: false, msg: e });
      } else {
        res.status(200).json({ state: true, msg: "Create massage success !", data: r });
      }
    })
  }
}
exports.getHistory = (req, res) => {
  req.checkParams('room_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    Message.find({ roomId: req.params.room_id })
      .populate({ path: 'userId', select: 'firstName lastName avatar' })
      .sort({ created_at: -1 })
      .limit(10)
      .exec((e, r) => {
        if (e) {
          res.status(200).json({ state: false, msg: e });
        } else {
          res.status(200).json({ state: true, data: r });
        }
      })
  }
}
exports.getMoreHistoryMessage = (req, res) => {
  req.checkParams('room_id', 'room_id is required').isMongoId();
  req.checkParams('page', 'page is required').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    let page = req.body.page;
    Message.find({ roomId: req.params.user_id })
      .populate({ path: 'userId', select: 'firstName lastName avatar' })
      .sort({ created_at: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .exec((e, r) => {
        if (e) {
          res.status(200).json({ state: false, msg: e });
        } else {
          res.status(200).json({ state: true, data: r });
        }
      })
  }
}