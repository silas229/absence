const getHTML = (name, additional) => `<b>hi ${name}</b>,
this is your collected Data as requested.`.replace('\n', '<br>');

const getText = (name, additional) => `hi ${name},
this is your collected Data, as requested`;

module.exports = (name, additional) =>
  ({ html: getHTML(name, additional), text: getText(name, additional) });

