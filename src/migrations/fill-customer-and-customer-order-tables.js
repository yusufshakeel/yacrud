'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../helpers/random-date-helper');

async function fillCustomerOrderTable(knex, databaseConfiguration, customerGuids) {
  const tableName = 'customerOrder';
  const inserts = [];
  customerGuids.forEach(customerGuid => {
    for (let i = 1; i <= getfake.number.unsignedInteger(5); i++) {
      const guid = uuidV4();
      const cent = getfake.number.integer(1, 10000000);
      const fraction = 100;
      const currency = 'INR';
      const orderStatus = ['CANCELLED', 'RETURNED', 'DELIVERED'][getfake.number.integer(0, 2)];
      const createdAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
      const updatedAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
      inserts.push({
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
  const dataToInsert = inserts.map(data => {
    const { guid, customerGuid, cent, fraction, currency, orderStatus, createdAt, updatedAt } =
      data;
    if (databaseConfiguration.client === 'pg') {
      return `('${guid}','${customerGuid}','${cent}','${fraction}','${currency}','${orderStatus}','${createdAt}','${updatedAt}')`;
    } else if (['mysql2'].includes(databaseConfiguration.client)) {
      return `("${guid}","${customerGuid}","${cent}","${fraction}","${currency}","${orderStatus}","${createdAt}","${updatedAt}")`;
    }
  });
  console.log(`Filling table: ${tableName}`);
  if (databaseConfiguration.client === 'pg') {
    await knex.raw(
      `insert into "${tableName}"(guid,"customerGuid",cent,fraction,currency,"orderStatus","createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    await knex.raw(
      `insert into ${tableName}(guid,customerGuid,cent,fraction,currency,orderStatus,createdAt,updatedAt) values ${dataToInsert.join(
        ','
      )}`
    );
  }
  console.log(`Filled table: ${tableName}`);
}

async function fillCustomerTable(knex, databaseConfiguration) {
  const tableName = 'customer';
  const customerGuids = [];
  const inserts = [];
  for (let i = 1; i <= 10000; i++) {
    const guid = uuidV4();
    const password = getfake.hash.md.md5();
    const firstName = getfake.name.english.firstName();
    const lastName = getfake.name.english.lastName();
    const accountStatus = ['ACTIVE', 'INACTIVE', 'SUSPENDED'][getfake.number.integer(0, 2)];
    const createdAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    const updatedAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    const email = `${firstName.toLowerCase()}.${getfake.hash.md.md5().substring(0, 8)}@example.com`;
    inserts.push({
      guid,
      password,
      firstName,
      lastName,
      accountStatus,
      createdAt,
      updatedAt,
      email
    });
    customerGuids.push(guid);
  }
  const dataToInsert = inserts.map(data => {
    const { guid, password, firstName, lastName, accountStatus, createdAt, updatedAt, email } =
      data;
    if (databaseConfiguration.client === 'pg') {
      return `('${guid}','${email}','${password}','${firstName}','${lastName}','${accountStatus}','${createdAt}','${updatedAt}')`;
    } else if (['mysql2'].includes(databaseConfiguration.client)) {
      return `("${guid}","${email}","${password}","${firstName}","${lastName}","${accountStatus}","${createdAt}","${updatedAt}")`;
    }
  });
  console.log(`Filling table: ${tableName}`);
  if (databaseConfiguration.client === 'pg') {
    await knex.raw(
      `insert into ${tableName}(guid,email,password,"firstName","lastName","accountStatus","createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    await knex.raw(
      `insert into ${tableName}(guid,email,password,firstName,lastName,accountStatus,createdAt,updatedAt) values ${dataToInsert.join(
        ','
      )}`
    );
  }
  console.log(`Filled table: ${tableName}`);
  await fillCustomerOrderTable(knex, databaseConfiguration, customerGuids);
}

module.exports = fillCustomerTable;
