'use strict';
const { getfake } = require('getfake');
module.exports = function randomDateHelper() {
  const randomDate = new Date(
    getfake.number.integer(2000, new Date().getFullYear()),
    getfake.number.integer(1, 11),
    getfake.number.integer(1, 28),
    getfake.number.integer(0, 23),
    getfake.number.integer(0, 59),
    getfake.number.integer(0, 59)
  );
  return {
    randomDate,
    iso: randomDate.toISOString(),
    YYYY_MM_DD__HH_MM_SS: `${randomDate.getFullYear()}-${randomDate
      .getMonth()
      .toString()
      .padStart(2, '0')}-${randomDate.getDate().toString().padStart(2, '0')} ${randomDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${randomDate.getMinutes().toString().padStart(2, '0')}:${randomDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`
  };
};
