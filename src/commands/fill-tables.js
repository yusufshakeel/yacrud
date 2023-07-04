'use strict';

const messageTable = require('../migrations/data/message-table');
const customerTables = require('../migrations/data/customer-tables');

async function fillTables(knex, databaseConfiguration) {
  console.info('Filling tables...');
  await messageTable.insertRows(knex, databaseConfiguration);
  await customerTables.insertRows(knex, databaseConfiguration);
  console.info('Filled tables.');
}

async function run(knex, databaseConfiguration) {
  try {
    await fillTables(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - FILL-TABLES - run', error.message);
  }
}

module.exports = run;
