
const path = require('path');

exports.checkFileIsImage = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  // const mimetype = filetypes.test(file.mimetype);
  if (extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}