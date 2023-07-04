'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const randomDateHelper = require('../../helpers/random-date-helper');

module.exports = async function fillMessageTable(knex, databaseConfiguration) {
  const tableName = 'message';
  const inserts = [];
  for (let i = 1; i <= 10000; i++) {
    const guid = uuidV4();
    const message = getfake.phrase.any();
    const status = ['PUBLISHED', 'DRAFT', 'DELETED'][getfake.number.integer(0, 2)];
    const createdAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    const updatedAt = randomDateHelper().YYYY_MM_DD__HH_MM_SS;
    inserts.push({ guid, message, status, createdAt, updatedAt });
  }
  const dataToInsert = inserts.map(data => {
    const { guid, message, status, createdAt, updatedAt } = data;
    if (databaseConfiguration.client === 'pg') {
      return `('${guid}','${message}','${status}','${createdAt}','${updatedAt}')`;
    } else if (['mysql2'].includes(databaseConfiguration.client)) {
      return `("${guid}","${message}","${status}","${createdAt}","${updatedAt}")`;
    }
  });
  console.log(`Filling table: ${tableName}`);
  if (databaseConfiguration.client === 'pg') {
    await knex.raw(
      `insert into ${tableName} (guid,message,status,"createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    await knex.raw(
      `insert into ${tableName} (guid,message,status,createdAt,updatedAt) values ${dataToInsert.join(
        ','
      )}`
    );
  }
  console.log(`Filled table: ${tableName}`);
};
