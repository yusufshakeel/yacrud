'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../../../helpers/random-date-helper');

module.exports = function seed({ numberOfRows, customerGuids }) {
  const rows = [];
  for (let i = 1; i <= numberOfRows; i++) {
    const guid = uuidV4();
    const customerGuid = customerGuids[getfake.number.integer(0, customerGuids.length - 1)];
    const cent = getfake.number.integer(1, 10000000);
    const fraction = 100;
    const currency = 'INR';
    const orderStatus = ['CANCELLED', 'RETURNED', 'DELIVERED'][getfake.number.integer(0, 2)];
    const dateTime = randomDateHelper();
    const createdAt = dateTime.startDate;
    const updatedAt = dateTime.endDate;

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
  return { rows, customerGuids };
};
