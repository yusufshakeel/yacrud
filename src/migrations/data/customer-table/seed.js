'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../../../helpers/random-date-helper');

module.exports = function seed({ numberOfRows }) {
  const customerGuids = [];
  const rows = [];
  for (let i = 1; i <= numberOfRows; i++) {
    const guid = uuidV4();
    const password = getfake.hash.md.md5();
    const firstName = getfake.name.english.firstName();
    const lastName = getfake.name.english.lastName();
    const accountStatus = ['ACTIVE', 'INACTIVE', 'SUSPENDED'][getfake.number.integer(0, 2)];
    const createdAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    const updatedAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    const email = `${firstName.toLowerCase()}.${getfake.hash.md.md5().substring(0, 8)}@example.com`;

    rows.push({ guid, password, firstName, lastName, accountStatus, createdAt, updatedAt, email });
    customerGuids.push(guid);
  }

  return { rows, customerGuids };
};
