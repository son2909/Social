var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'sondanptit@gmail.com', // generated ethereal user
        pass: 'oogwijjlkxamucdo' // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});
module.exports = transporter;