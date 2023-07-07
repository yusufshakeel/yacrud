'use strict';

const messageTable = require('../migrations/data/message-table');
const customerTables = require('../migrations/data/customer-tables');
const stockTradeTable = require('../migrations/data/stock-trade-table');
const { DATABASE_DEFAULT_WRITE_CONDITIONS } = require('../constants');

async function fillTables(knex, databaseConfiguration) {
  console.info('Filling tables...');

  let numberOfRowsToCreate = databaseConfiguration.writeCondition.numberOfRows;
  console.log(`Total number of rows to create per table: ${numberOfRowsToCreate}`);

  while (numberOfRowsToCreate > 0) {
    const numberOfRows =
      numberOfRowsToCreate > DATABASE_DEFAULT_WRITE_CONDITIONS.NUMBER_OF_ROWS_TO_CREATE
        ? DATABASE_DEFAULT_WRITE_CONDITIONS.NUMBER_OF_ROWS_TO_CREATE
        : numberOfRowsToCreate;

    await messageTable.insertRows(knex, databaseConfiguration, numberOfRows);
    await customerTables.insertRows(knex, databaseConfiguration, numberOfRows);
    await stockTradeTable.insertRows(knex, databaseConfiguration, numberOfRows);

    numberOfRowsToCreate -= numberOfRows;
  }
  console.info('Done!');
}

async function run(knex, databaseConfiguration) {
  try {
    await fillTables(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. fill-tables:', error.message);
  }
}

module.exports = run;
