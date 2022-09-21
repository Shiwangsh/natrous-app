const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // connectionTimeout: 5 * 60 * 1000,
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Shiwangsh KC <shiwayway@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) Send the email wiith nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
