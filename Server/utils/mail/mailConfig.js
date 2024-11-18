const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, content) => {
  try {
    const info = await transporter.sendMail({
      from: `"Ngô Quốc An" <${process.env.EMAIL_ACCOUNT}>`,
      to,
      subject,
      html: content,
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
