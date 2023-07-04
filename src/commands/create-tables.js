'use strict';

const createMessageTable = require('../migrations/tables/create-message-table');
const createCustomerTable = require('../migrations/tables/create-customer-table');
const createCustomerOrderTable = require('../migrations/tables/create-customer-order-table');
const createStockTradeTable = require('../migrations/tables/create-stock-trade-table');

async function createTables(knex) {
  console.info('Creating tables...');
  await createMessageTable(knex);
  await createCustomerTable(knex);
  await createCustomerOrderTable(knex);
  await createStockTradeTable(knex);
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
