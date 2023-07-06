'use strict';
const { getfake } = require('getfake');
const { SEED_DATA } = require('../constants');
module.exports = function randomDateHelper() {
  const getDateTime = randomDate => {
    const year = randomDate.getFullYear();
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const date = randomDate.getDate().toString().padStart(2, '0');
    const hour = randomDate.getHours().toString().padStart(2, '0');
    const minute = randomDate.getMinutes().toString().padStart(2, '0');
    const second = randomDate.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  };

  const millisecondsToAdd = () =>
    getfake.number.integer(
      SEED_DATA.TOTAL_MILLISECONDS_IN_A_MINUTE,
      SEED_DATA.TOTAL_MILLISECONDS_IN_A_YEAR
    );

  const randomDate = () =>
    new Date(
      new Date(
        getfake.number.integer(SEED_DATA.START_YEAR, new Date().getFullYear()),
        0,
        1
      ).getTime() + millisecondsToAdd()
    );
  const startDate = randomDate();
  const endDate = new Date(startDate.getTime() + millisecondsToAdd());

  return {
    YYYY_MM_DD__HH_MM_SS: getDateTime(randomDate()),
    startDate: getDateTime(startDate),
    endDate: getDateTime(endDate)
  };
};
