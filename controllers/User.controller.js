const User = require('../models/User');
const jwt = require('jsonwebtoken');
const uid = require('uid');
const AuthController = require('../Auth/AuthorizationController');
const mailer = require('../helper/mailer');
const config = require('../config/utils');
const bcrypt = require('bcryptjs');
const redisClient = require('../helper/redis');
exports.postLogin = (req, res) => {
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ status: false, msg: errors[0].msg, code: 'ERR_403_LOGIN' });
  } else {
    try {
      User.findOne({ username: req.body.username }).lean().exec(async (e, r) => {
        if (e) {
          res.status(200).json({ status: false, msg: e, code: 'ERR_403_LOGIN' });
        } else {
          if (r) {
            const match = await bcrypt.compare(String(req.body.password), r.password);
            if (match) {
              let token = AuthController.login(r);
              res.status(200).json({ status: true, msg: 'authentication success', token })
            } else {
              res.status(200).json({ status: false, msg: 'authentication failed password not correct', code: 'ERR_403_LOGIN' });
            }
          } else {
            res.status(200).json({ status: false, msg: "Username or password not correct or not exist !", code: 'ERR_403_LOGIN' });
          }
        }
      })
    } catch (error) {
      res.status(500).json({ status: false, error, code: ERR_500 });
    }
  }
}
exports.postRegister = async (req, res) => {
  req.checkBody('firstName', 'firstName is required').notEmpty();
  req.checkBody('lastName', 'lastName is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('birthday', 'birthday is required').notEmpty();
  req.checkBody('gender', 'gender is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg, code: 'ERR_422_WRONG_INPUT' });
  } else {
    let { password } = req.body;
    bcrypt.hash(password, config.saltRounds, async (err, hash) => {
      if (err) {
        res.status(200).json({ state: false, msg: err });
      } else {
        let obj = { firstName, lastName, username, birthday, gender, email } = req.body;
        obj.password = hash;
        try {
          let userUsername = await User.findOne({ username }).lean();
          let userEmail = await User.findOne({ email }).lean();
          if (userUsername) {
            res.status(200).json({ state: false, msg: 'Username is existed !' });
          } else {
            if (userEmail) {
              res.status(200).json({ state: false, msg: 'Email is existed !' });
            } else {
              User.create(obj, (e, r) => {
                if (e) res.status(200).json({ state: false, msg: e });
                else res.status(200).json({ state: true, msg: 'Register user success !' });
              })
            }

          }
        } catch (error) {
          res.status(500).json({ state: false, msg: error })
        }
      }
    })

  }
}
exports.updateUserById = async (req, res) => {
  req.checkParams('user_id', 'user_id is empty').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('fullname', 'fullname is required').notEmpty();
  const errors = req.validationErrors();
  try {
    if (errors) {
      res.status(200).json({ status: false, msg: errors[0].msg, code: 'ERR_403_UPDATE_USER' });
    }
    else {
      const user = await User.findById(req.params.user_id);
      if (user) {
        bcrypt.hash(req.body.password, config.saltRounds, (err, hash) => {
          if (err) {
            res.status(200).json({ status: false, msg: 'encrypt password failed !' + err, code: 'ERR_403_UPDATE_USER' });
          } else {
            user.fullname = req.body.fullname;
            user.email = req.body.email;
            user.password = hash;
            user.save((err, rs) => {
              if (err) {
                res.status(200).json({ status: false, msg: 'update user failed: ' + err, code: 'ERR_403_UPDATE_USER' });
              } else {
                res.status(200).json({ status: true, data: user });
              }
            });
          }
        })
      }
      else {
        res.status(200).json({ status: false, msg: 'update user failed: notfound!', code: 'ERR_403_UPDATE_USER' });
      }

    }
  } catch (error) {
    res.status(200).json({ status: false, msg: 'update user failed: ' + error, code: 'ERR_403_UPDATE_USER' });
  }
}
exports.getProfileUser = async (req, res) => {
  req.checkQuery('user_id', 'user_id is a mongoID & not empty !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    User.findById(req.query.user_id).select('-username -password').lean().exec((e, r) => {
      if (e) {
        res.status(200).json({ state: false, msg: e });
      } else {
        let key = `/user/get-user?user_id=${req.query.user_id}`;
        redisClient.setData(key, r);
        res.status(200).json({ state: true, data: r });
      }
    })

  }
}
exports.getProfile = (req, res) => {
  if (req.user) {
    res.status(200).json({ state: true, data: req.user });
  } else {
    res.status(200).json({ state: false, msg: 'Token errors' });
  }
}
exports.getAllUser = (req, res) => {
  req.checkQuery("page", ('page is number')).isInt();
  const options = {
    select: 'firstName lastName avatar',
    page: req.query.page === undefined ? 1 : req.query.page
  };
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    User.paginate({}, options, (e, r) => {
      if (e) {
        res.status(200).json({ status: false, msg: e });
      } else {
        let key = `/user/get-all-user?page=${req.query.page}`;
        redisClient.setData(key, r);
        res.status(200).json({ status: true, data: r });
      }
    });
  }

}
exports.confirmEmail = async (req, res) => {
  var email = req.body.email;
  req.checkBody('email', 'email is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    try {
      User.findOne({ email }, async (err, rs) => {
        if (err) res.status(200).json({ msg: 'Error query', err });
        else {
          if (rs) {
            let random = uid(6);
            const hash = await bcrypt.hash(random, config.saltRounds);
            User.updateOne({ _id: rs._id }, { password: hash }, (err, r) => {
              if (err) {
                res.status(200).json({ status: false, msg: err });
              } else {
                var mailOptions = {
                  from: '"hữu Sơn 👻" <sondanptit@gmail.com>', // sender address
                  to: email, // list of receivers
                  subject: 'Forget password ✔', // Subject line
                  html: `<b style="color:black;">Tài khoản của bạn là: ${rs.username}</b><br><b>Mật khẩu mới của bạn là : ${random} </b>` // html body
                };
                mailer.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    res.status(200).json({
                      status: 409,
                      err: error
                    })
                  } else {
                    res.status(200).json({
                      status: 200,
                      data: 'Vui lòng kiểm tra hòm thử điện tử !'
                    })
                  }
                });
              }
            });
          } else {
            res.status(200).json({ msg: 'Email not exist !' });
          }
        }
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
exports.changePassword = async (req, res) => {
  req.checkBody('oldPassword', 'oldPassword is required').notEmpty();
  req.checkBody('newPassword', 'newPassword is required').notEmpty();
  req.checkParams('user_id', 'user_id notEmpty & is a MongoId').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    User.findById(req.params.user_id).lean().exec(async (e, r) => {
      if (e) {
        res.status(200).json({ state: false, msg: e });
      } else {
        try {
          const match = await bcrypt.compare(String(req.body.oldPassword), r.password);
          if (match) {
            bcrypt.hash(req.body.newPassword, config.saltRounds, (err, hash) => {
              if (err) {
                res.status(200).json({ state: false, message: err });
              } else {
                User.updateOne({ _id: r._id }, { password: hash }, (err, rs) => {
                  if (err) {
                    res.status(200).json({ state: false, msg: err });
                  } else {
                    let key = `/user/get-all-user?page=${req.query.page}`;
                    redisClient.setData(key, r);
                    res.status(200).json({ state: true, msg: 'Password changed successfully !' });
                  }
                })
              }
            });
          } else {
            res.status(200).json({ state: false, message: 'Invalid oldPassword' });
          }
        } catch (error) {
          res.status(500).json({ state: false, message: error });
        }
      }
    })
  }
}
exports.updateInfoUser = async (req, res) => {
  req.checkParams('user_id', 'user_id is a mongoID & required').isMongoId();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('phone', 'phone is required').notEmpty();
  req.checkBody('birthday', 'birthday is required').notEmpty();
  req.checkBody('address', 'address is required').notEmpty();
  req.checkBody('relationship', 'relationship is number & in [0,1,2]').isIn([0, 1, 2]);
  req.checkBody('gender', 'gender is a number in [0,1,2,3]').isIn([0, 1, 2, 3]);
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    try {
      let user = await User.find({ email: req.body.email, _id: { $ne: req.params.user_id } }).lean();
      if (user.length > 0) {
        res.status(200).json({ state: false, msg: 'Email is existed !' });
      } else {
        User.updateOne({ _id: req.params.user_id }, { $set: req.body }, (e, r) => {
          if (e) res.status(200).json({ state: false, msg: e });
          else {
            let key = `/user/get-user?user_id=${req.params.user_id}`;
            redisClient.clearDataByKey(key);
            res.status(200).json({ state: true, msg: 'Update information user successfully !' });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ state: false, msg: error });
    }
  }
}
exports.updateStoryUser = async (req, res) => {
  req.checkParams('user_id', 'user_id is required & is mongoID').isMongoId();
  req.checkBody('story', 'story is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    User.updateOne({ _id: req.params.user_id }, { $set: req.body }, (e, r) => {
      if (e) {
        res.status(200).json({ state: false, msg: e });
      } else {
        let key = `/user/get-user?user_id=${req.params.user_id}`;
        redisClient.clearDataByKey(key);
        res.status(200).json({ state: true, msg: 'Update story for user successfully !' });
      }
    })
  }
}
exports.searchUser = async (req, res) => {
  req.checkQuery('q', 'q is not empty').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    let conditions = {
      $or: [
        {
          firstName: { $regex: '.*' + req.query.q.trim() + '.*', $options: '-i' }
        },
        {
          lastName: { $regex: '.*' + req.query.q.trim() + '.*', $options: '-i' }
        }
      ]
    }
    User.find(conditions).lean().select('firstName lastName avatar active').exec((e, r) => {
      if (e) res.status(200).json({ state: false, error: e });
      else {
        res.status(200).json({ state: true, data: r });
      }
    })
  }
}