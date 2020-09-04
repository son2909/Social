const RoomChat = require('../models/RoomChat');

exports.setRoom = async (req, res) => {
  req.checkBody('userIds', 'userIds is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    console.log(req.body.userIds);
    let array = req.body.userIds;
    let newarr = [];
    newarr = array.reduce((accumulator, currentItem) => {
      return accumulator.includes(currentItem) ? accumulator : [...accumulator, currentItem];
    }, []);
    try {
      let room = await RoomChat.findOne({ users: { $elemMatch: { $in: newarr } } }).lean();
      if (!room) {
        RoomChat.create({ users: newarr }, (e, r) => {
          if (e) {
            res.status(200).json({ state: false, msg: e });
          } else {
            res.status(200).json({ state: true, msg: 'set room success', room_id: r._id });
          }
        })
      } else {
        res.status(200).json({ state: false, msg: 'Room is existed !', room_id: room._id });
      }
    } catch (error) {
      res.status(500).json({ state: false, msg: error });
    }
  }
}