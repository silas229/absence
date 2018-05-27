const sendMail = require('../controller/mail/TransportController');


function sendTemplateEmail({
  recipient, subject, templateName, attachments = [], additional = {},
}) {
// eslint-disable-next-line global-require,import/no-dynamic-require
  const template = require(`../templates/${templateName}Template`)(recipient.name, additional);
  sendMail({
    recipient: recipient.email,
    subject,
    attachments,
    text: template.text,
    html: template.html,

  });
}

module.exports = sendTemplateEmail;
