/* eslint-disable no-console */
const nodeMailer = require('nodemailer');

const transport = () => nodeMailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
});

function sendmail({
  recipient, subject, text, html, attachments,
}) {
  transport().sendMail({
    from: process.env.EMAIL_SENDER_ADDRESS,
    to: recipient,
    subject,
    text,
    html,
    attachments,
  }, (err) => {
    if (err) console.error(err);
  });
}

module.exports = sendmail;
