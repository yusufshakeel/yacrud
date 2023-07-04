'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../../../helpers/random-date-helper');

module.exports = function seed(customerGuids) {
  const rows = [];
  customerGuids.forEach(customerGuid => {
    for (let i = 1; i <= getfake.number.unsignedInteger(5); i++) {
      const guid = uuidV4();
      const cent = getfake.number.integer(1, 10000000);
      const fraction = 100;
      const currency = 'INR';
      const orderStatus = ['CANCELLED', 'RETURNED', 'DELIVERED'][getfake.number.integer(0, 2)];
      const createdAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
      const updatedAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;

      rows.push({
        guid,
        customerGuid,
        cent,
        fraction,
        currency,
        orderStatus,
        createdAt,
        updatedAt
      });
    }
  });
  return { rows, customerGuids };
};
