'use strict';
const knexHelper = require('../databases/knex')();

async function listTables(knex, databaseConfiguration) {
  console.info('Listing tables...');
  await knexHelper.listTables(knex, databaseConfiguration);
  console.info('Done!');
}

async function run(knex, databaseConfiguration) {
  try {
    await listTables(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. list-tables:', error.message);
  }
}

module.exports = run;
