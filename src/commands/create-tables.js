'use strict';

const createMessageTable = require('../migrations/create-message-table');
const createCustomerTable = require('../migrations/create-customer-table');
const createOrderTable = require('../migrations/create-customer-order-table');

async function createTables(knex) {
  console.info('Creating tables...');
  await createMessageTable(knex);
  await createCustomerTable(knex);
  await createOrderTable(knex);
  console.info('Created tables.');
}

async function run(knex) {
  try {
    await createTables(knex);
  } catch (error) {
    console.error('CATCH_BLOCK - CREATE-TABLES - run', error.message);
  }
}

module.exports = run;
