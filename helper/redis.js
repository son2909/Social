// let client = require('../Auth/Auth_redis');
// exports.setData = (key, value) => {
//   client.SETEX(key, 300, JSON.stringify(value));
// }
// exports.clearData = () => {
//   client.flushall();
// }
// exports.clearDataByKey = (key) => {
//   client.DEL(key);
// }
// exports.getProfileUser = (req, res, next) => {
//   let key = `/user/get-user?user_id=${req.query.user_id}`;
//   client.get(key, (error, data) => {
//     if (error) res.status(400).send(error);
//     if (data !== null) {
//       res.status(200).json({
//         state: true,
//         data: JSON.parse(data)
//       })
//     }
//     else next();
//   });
// }
// exports.getAllUser = (req, res, next) => {
//   let key = `/user/get-all-user?page=${req.query.page}`;
//   client.get(key, (err, data) => {
//     if (err) res.status(400).send(err);
//     if (data !== null) {
//       res.status(200).json({
//         state: true,
//         data: JSON.parse(data)
//       })
//     }
//     else next();
//   })
// }