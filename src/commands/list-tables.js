'use strict';
const knexHelper = require('../helpers/knex-helper');

async function listTables(knex, databaseConfiguration) {
  console.info('Listing tables...');
  await knexHelper.listTables(knex, databaseConfiguration);
  console.info('Done!');
}

async function run(knex, databaseConfiguration) {
  try {
    await listTables(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - LIST-TABLES - run', error.message);
  }
}

module.exports = run;
