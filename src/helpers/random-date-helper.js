'use strict';
const { getfake } = require('getfake');
module.exports = function randomDateHelper() {
  const randomDate = new Date(
    getfake.number.integer(2000, new Date().getFullYear()),
    getfake.number.integer(0, 11),
    getfake.number.integer(1, 28),
    getfake.number.integer(0, 23),
    getfake.number.integer(0, 59),
    getfake.number.integer(0, 59)
  );

  const year = randomDate.getFullYear();
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const date = randomDate.getDate().toString().padStart(2, '0');
  const hour = randomDate.getHours().toString().padStart(2, '0');
  const minute = randomDate.getMinutes().toString().padStart(2, '0');
  const second = randomDate.getSeconds().toString().padStart(2, '0');

  return {
    YYYY_MM_DD__HH_MM_SS: `${year}-${month}-${date} ${hour}:${minute}:${second}`
  };
};
