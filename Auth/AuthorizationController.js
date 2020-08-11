const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/utils');
exports.login = (user) => {
    let token = jwt.sign({
        userId: user._id,
        email: user.email,
        fullName: user.firstName + " " + user.lastName
    }, config.secret, {
        algorithm: config.algorithm,
        expiresIn: '24h'
    });
    return token;
}
exports.verifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(403).send(JSON.stringify({ status: false, msg: "Token not provide !" }));
            } else {
                let u = jwt.verify(authorization[1], config.secret);
                if (u) {
                    let { exp } = u;
                    if (Date.now() >= exp * 1000) {
                        return res.status(403).send(JSON.stringify({ status: false, msg: "Token expired", code: 498 }));
                    } else {
                        User.findOne({
                            _id: u.userId
                        }).lean().exec((e, user) => {
                            if (e) {
                                res.status(500).send(JSON.stringify({ state: false, msg: 'Err connection !' }));
                            } else {
                                if (user) {
                                    req.user = {
                                        userId: user._id,
                                        email: user.email,
                                        fullName: user.firstName + " " + user.lastName
                                    }
                                    return next()
                                } else {
                                    res.status(200).send(JSON.stringify({ state: false, msg: "User of token not exist !", code: 403 }));
                                }
                            }
                        })
                    }
                } else {
                    res.status(500).send(JSON.stringify({ state: false, msg: 'Token not correct !' }));
                }
            }
        } catch (err) {
            if(err.name == 'TokenExpiredError'){
                return res.status(403).send(JSON.stringify({ status: false, msg: "Token expired", code: 498 }));
            }else {
                return res.status(403).send(JSON.stringify({ status: false, msg: {err}, code: 500 }));
            }
        }
    } else {
        return res.status(403).send(JSON.stringify({ status: false, msg: "token_not_provide", code: 404 }));
    }
}