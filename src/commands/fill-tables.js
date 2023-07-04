'use strict';

const fillMessageTable = require('../migrations/fill-message-table');
const fillCustomerAndCustomerOrderTable = require('../migrations/fill-customer-and-customer-order-tables');

async function fillTables(knex, databaseConfiguration) {
  console.info('Filling tables...');
  await fillMessageTable(knex, databaseConfiguration);
  await fillCustomerAndCustomerOrderTable(knex, databaseConfiguration);
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
