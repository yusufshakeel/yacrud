'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../constants');
const knexHelper = require('../helpers/knex-helper')();
const createMessageTable = require('../migrations/tables/create-message-table');
const createCustomerTable = require('../migrations/tables/create-customer-table');
const createCustomerOrderTable = require('../migrations/tables/create-customer-order-table');
const createStockTradeTable = require('../migrations/tables/create-stock-trade-table');

async function recreateTables(knex) {
  console.info('[Re]creating tables...');
  const operations = [
    { tableName: DATABASE_DEFAULT_TABLES.MESSAGE, action: () => createMessageTable(knex) },
    { tableName: DATABASE_DEFAULT_TABLES.CUSTOMER, action: () => createCustomerTable(knex) },
    {
      tableName: DATABASE_DEFAULT_TABLES.CUSTOMER_ORDER,
      action: () => createCustomerOrderTable(knex)
    },
    { tableName: DATABASE_DEFAULT_TABLES.STOCK_TRADE, action: () => createStockTradeTable(knex) }
  ];
  await Promise.all(operations.map(op => knexHelper.dropTableIfExists(knex, op.tableName)));
  await Promise.all(operations.map(op => op.action()));
  console.info('Done!');
}

async function run(knex) {
  try {
    await recreateTables(knex);
  } catch (error) {
    console.error('ERROR. recreate-tables:', error.message);
  }
}

module.exports = run;
