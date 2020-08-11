const storageImage_s3 = require('../middleware/aws_cloud_storage');
const User = require('../models/User');
const redisClient = require('../helper/redis');
const imageToBase64 = require('image-to-base64');
const path = require('path');
const shell = require('shelljs');
const storageImage_v3 = require('../helper/driver-v3');
// var mmm = require('mmmagic'),
//       Magic = mmm.Magic;

exports.uploadSingleImage = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImage(req, res, (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          const imageName = req.file.key;
          const imageLocation = req.file.location;
          User.updateOne({ _id: req.params.user_id }, { avatar: imageLocation }, (err, rs) => {
            if (err) {
              res.status(200).json({ status: false, msg: err, code: 'ERR_403_UPLOAD_FILE' });
            } else {
              // Save the file name into database into profile model
              redisClient.clearData();
              res.status(200).json({
                image: imageName,
                location: imageLocation
              });
            }
          })

        }
      }
    });
  }
}
exports.uploadImageCover = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImage(req, res, (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          const imageName = req.file.key;
          const imageLocation = req.file.location;
          console.log(req.params.user_id)
          User.updateOne({ _id: req.params.user_id }, { coverImage: imageLocation }, (err, rs) => {
            if (err) {
              res.status(200).json({ status: false, msg: err, code: 'ERR_403_UPLOAD_FILE' });
            } else {
              // Save the file name into database into profile model
              redisClient.clearData();
              res.status(200).json({
                image: imageName,
                location: imageLocation
              });
            }
          })

        }
      }
    });
  }
}
exports.uploadMultipleImageFeed = (req, res) => {
  storageImage_s3.uploadsFeedImages(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      if (req.files === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        let fileArray = req.files,
          fileLocation;
        const coverImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          coverImgLocationArray.push(fileLocation)
        }
        // Save the file name into database
        res.json({
          locationArray: coverImgLocationArray
        });
      }
    }

  })
}

exports.uploadSingleImageLocal = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImageLocal(req, res, async (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          try {
            // const imageLocation = req.file.location;
            let pathImage = path.join(__dirname, `../public/uploads/${String(req.file.originalname).toLowerCase()}`);
            let imageBase64 = await imageToBase64(pathImage);
            User.updateOne({ _id: req.params.user_id }, { avatar: String(imageBase64) }, (err, rs) => {
              if (err) {
                res.status(200).json({ status: false, msg: err, code: 'ERR_403_UPLOAD_FILE' });
              } else {
                // Save the file name into database into profile model
                redisClient.clearData();
                shell.rm('-rf', pathImage);
                res.status(200).json({
                  image: 'upload Avatar success',
                  location: imageBase64
                });
              }
            })
          } catch (error) {
            res.status(500).json({
              state: false, msg: error
            })
          }
        }
      }
    });
  }
}
exports.uploadImageCoverLocal = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImageLocal(req, res, async (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          try {
            // const imageLocation = req.file.location;
            let pathImage = path.join(__dirname, `../public/uploads/${String(req.file.originalname).toLowerCase()}`);
            // var magic = new Magic(mmm.MAGIC_MIME_TYPE);
            // magic.detectFile(pathImage, function(err, result) {
            //     if (err) throw err;
            //     console.log(result);
            //     // output on Windows with 32-bit node:
            //     //    application/x-dosexec
            // });
            let imageBase64 = await imageToBase64(pathImage);
            User.updateOne({ _id: req.params.user_id }, { coverImage: String(imageBase64) }, (err, rs) => {
              if (err) {
                res.status(200).json({ status: false, msg: err, code: 'ERR_403_UPLOAD_FILE' });
              } else {
                // Save the file name into database into profile model
                redisClient.clearData();
                shell.rm('-rf', pathImage);
                res.status(200).json({
                  image: 'upload cover image success',
                  location: imageBase64
                });
              }
            })
          } catch (error) {
            res.status(500).json({
              state: false, msg: error
            })
          }
        }
      }
    });
  }
}
//upload multiMedia
exports.uploadMultipleImageFeedLocal = (req, res) => {
  storageImage_s3.uploadsFeedImagesLocal(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      if (req.files === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        let fileArray = req.files;
        let fileLocation;
        const coverImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          coverImgLocationArray.push(fileLocation)
        }
        // Save the file name into database
        res.json({
          locationArray: coverImgLocationArray
        });
      }
    }

  })
}
exports.uploadSingleImageCoverToDriver = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImageLocal(req, res, async (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          try {
            // const imageLocation = req.file.location;
            let pathImage = path.join(__dirname, `../public/uploads/${String(req.file.filename).toLowerCase()}`);
            let url = await storageImage_v3.uploadFileToDriver(pathImage, req.file.filename, req.file.mimeType);
            User.updateOne({ _id: req.params.user_id }, { coverImage: url }, (e, r) => {
              if (e) { console.log(e); }
              else {
                redisClient.clearData();
                shell.rm('-rf', pathImage);
                res.status(200).json({
                  image: 'upload coverImage success',
                  location: url
                });
              }
            })
          } catch (error) {
            res.status(500).json({
              state: false, msg: error
            })
          }
        }
      }
    });
  }
}
exports.uploadSingleImageToDriver = (req, res) => {
  req.checkParams('user_id', 'User_id is required & is a mongoId !').isMongoId();
  const errors = req.validationErrors();
  if (errors) {
    res.status(200).json({ state: false, msg: errors[0].msg });
  } else {
    storageImage_s3.uploadSingleImageLocal(req, res, async (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file === undefined) {
          res.status(200).json({
            msg: 'file not found !',
            code: 'ERR_403_UPLOAD_FILE'
          })
        } else {
          try {
            // const imageLocation = req.file.location;
            let pathImage = path.join(__dirname, `../public/uploads/${String(req.file.filename).toLowerCase()}`);
            let url = await storageImage_v3.uploadFileToDriver(pathImage, req.file.filename, req.file.mimeType);
            User.updateOne({ _id: req.params.user_id }, { avatar: url }, (e, r) => {
              if (e) { console.log(e); }
              else {
                redisClient.clearData();
                shell.rm('-rf', pathImage);
                res.status(200).json({
                  image: 'upload Avatar success',
                  location: url
                });
              }
            })
          } catch (error) {
            res.status(500).json({
              state: false, msg: error
            })
          }
        }
      }
    });
  }
}
