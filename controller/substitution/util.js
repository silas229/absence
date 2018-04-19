/* eslint-disable no-return-assign,consistent-return,array-callback-return */
const request = require('request-promise-native');

function replaceWhiteSpace(element, number) {
  let trueElement = element[number];
  if (number === 2) trueElement = trueElement.replace('<td class="list">', '');
  return trueElement.replace(/&#xA0;/g, '-');
}

module.exports = {
  prepareData: ($, classID) => {
    $('td').removeAttr('style');
    const selector = 'table:not(.info):not(.mon_head) tr:not(:has(>th))';

    return $(selector).map((index, entry) => {
      const element = $(entry).html().replace(new RegExp('<td class="list" align="center">', 'g'), '').split('</td>');
      if (element[0].includes(classID)) {
        return {
          hour: replaceWhiteSpace(element, 1),
          teacher: replaceWhiteSpace(element, 2),
          old_lesson: replaceWhiteSpace(element, 3),
          lesson: replaceWhiteSpace(element, 4),
          room: replaceWhiteSpace(element, 5),
        };
      }
    }).get();
  },

  computeMatchingDay: (data) => {
    const date = new Date().getDay();
    let weekDayNumber = 0;
    if (date === 0 || date === 5 || date === 6) weekDayNumber = 1;

    return data.timetables[weekDayNumber].src;
  },

  requester: url => request({ method: 'GET', url }),
};

