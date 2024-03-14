const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service:'gmail',
        secure:true,
        auth: {
          user: 'neuzbuddy456@gmail.com',
          pass: 'tngu kscl iyvb nhce',
        },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'www.sandeepdev.me - Sandeep Singh',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;