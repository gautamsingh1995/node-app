// emailConfig.js

const nodemailer = require('nodemailer');

const email = '4d7c876e5b2ef2';
const password = 'fe30e8adc36e88';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: email,
    pass: password,
  },
});


//const transporter = nodemailer.createTransport({
   // host: "sandbox.smtp.mailtrap.io",
  //  port: 2525,
  //  auth: {
  //    user: "4d7c876e5b2ef2",
  //    pass: "fe30e8adc36e88"
  //  }
 // });



client.messages
    .create({
                from: '+18065573085',
        to: '+918127219343'
    })
    .then(message => console.log(message.sid))
    .done();
module.exports = transporter;
