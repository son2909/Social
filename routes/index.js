const userController = require('../controllers/User.controller');
const mediaController = require('../controllers/media.controller');
const Authentication = require('../Auth/AuthorizationController');
const roomConstroller = require('../controllers/roomChat.controller');
const messageConstroller = require('../controllers/message.controller');
// const redisClient = require('../helper/redis');
module.exports = (app) => {

  app.get('/', (req, res) => {
    res.end('Welcome to i-social !');
  });

  app.post('/api/v1/user/login', userController.postLogin);
  app.post('/api/v1/user/register', userController.postRegister);
  app.post('/api/v1/user/forgetPassword', userController.confirmEmail);


  let express = require('express');
  let router = express.Router();
  express.application.prefix = express.Router.prefix = function (path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
  };

  //media
  //User
  router.prefix('/user', (route) => {
    route.get('/profile', userController.getProfile)
    route.post('/upload-image-avatar/:user_id', mediaController.uploadSingleImageToDriver);
    route.post('/upload-image-coverImage/:user_id', mediaController.uploadSingleImageCoverToDriver);
    route.get('/get-user', userController.getProfileUser);
    route.get('/get-all-user', userController.getAllUser);
    route.post('/change-password/:user_id', userController.changePassword);
    route.put('/update-story/:user_id', userController.updateStoryUser);
    route.put('/update/:user_id', userController.updateInfoUser);
    route.get('/search', userController.searchUser)
    route.put('/follow-user/:user_id', userController.followUser);
    route.put('/unfollow-user/:user_id', userController.unFollowUser);
    route.put('/update-avatar/:user_id', mediaController.updateAvatar);
    route.put('/update-cover-image/:user_id', mediaController.updateCoverImage);
  });
  //room 
  router.prefix('/room', (route) => {
    route.post('/set-room', roomConstroller.setRoom);
  })
  //message
  router.prefix('/message', (route) => {
    route.post('/set-message', messageConstroller.setMessage);
    route.get('/history/:room_id', messageConstroller.getHistory);
    route.get('/more-history-message/:room_id/:page', messageConstroller.getMoreHistoryMessage);
  })
  //feed 
  router.prefix('/feed', (route) => {
    route.post('/upload-multiple-images', mediaController.uploadMultipleImageFeedLocal);
  });



  app.use('/api/v1', Authentication.verifyToken, router);
}