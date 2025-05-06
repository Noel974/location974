const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = function sendPasswordEmail(to, password) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Mot de passe journalier admin",
    text: `Votre mot de passe du jour est : ${password}`
  });
};
