'use strict';

const fillMessageTable = require('../migrations/fill-message-table');
const fillCustomerAndCustomerOrderTable = require('../migrations/fill-customer-and-customer-order-tables');

async function fillTables(knex) {
  console.info('Fill tables...');
  await fillMessageTable(knex);
  await fillCustomerAndCustomerOrderTable(knex);
  console.info('Filled tables.');
}

async function run(knex) {
  try {
    await fillTables(knex);
  } catch (error) {
    console.error('CATCH_BLOCK - FILL-TABLES - run', error.message);
  }
}

module.exports = run;
