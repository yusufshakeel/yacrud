'use strict';
const cliProgress = require('cli-progress');
const messageTable = require('../migrations/data/message-table');
const customerTables = require('../migrations/data/customer-tables');
const stockTradeTable = require('../migrations/data/stock-trade-table');
const { DATABASE_DEFAULT_WRITE_CONDITIONS } = require('../constants');

async function fillTables(knex, databaseConfiguration) {
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  console.info('Filling tables...');

  let numberOfRowsToCreate = +databaseConfiguration.writeCondition.numberOfRows;
  let rowsCreated = 0;
  console.log(`Total number of rows to create per table: ${numberOfRowsToCreate}`);

  progressBar.start(numberOfRowsToCreate, rowsCreated);

  while (numberOfRowsToCreate > 0) {
    progressBar.update(rowsCreated);

    const numberOfRows =
      numberOfRowsToCreate > DATABASE_DEFAULT_WRITE_CONDITIONS.NUMBER_OF_ROWS_TO_CREATE
        ? +DATABASE_DEFAULT_WRITE_CONDITIONS.NUMBER_OF_ROWS_TO_CREATE
        : +numberOfRowsToCreate;

    await Promise.all([
      messageTable.insertRows(knex, databaseConfiguration, numberOfRows),
      customerTables.insertRows(knex, databaseConfiguration, numberOfRows),
      stockTradeTable.insertRows(knex, databaseConfiguration, numberOfRows)
    ]);

    numberOfRowsToCreate -= numberOfRows;
    rowsCreated += numberOfRows;
  }
  progressBar.update(rowsCreated);
  progressBar.stop();
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
