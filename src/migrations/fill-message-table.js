'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');

module.exports = async function fillMessageTable(knex) {
  const tableName = 'message';
  const inserts = [];
  for (let i = 1; i <= 10000; i++) {
    const guid = uuidV4();
    const message = getfake.phrase.any();
    const createdAt = getfake.time.utcTimestamp();
    const updatedAt = getfake.time.utcTimestamp();
    inserts.push(`('${guid}','${message}','${createdAt}','${updatedAt}')`);
  }
  console.log(`Filling table: ${tableName}`);
  await knex.raw(
    `insert into ${tableName}(guid,message,"createdAt","updatedAt") values ${inserts.join(',')}`
  );
  console.log(`Filled table: ${tableName}`);
};
