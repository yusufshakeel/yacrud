'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../../../helpers/random-date-helper');

module.exports = function seed({ numberOfRows }) {
  const rows = [];
  for (let i = 1; i <= numberOfRows; i++) {
    const guid = uuidV4();
    const message = getfake.phrase.any();
    const status = ['PUBLISHED', 'DRAFT', 'DELETED'][getfake.number.integer(0, 2)];
    const dateTime = randomDateHelper();
    const createdAt = dateTime.startDate;
    const updatedAt = dateTime.endDate;
    rows.push({ guid, message, status, createdAt, updatedAt });
  }
  return rows;
};
