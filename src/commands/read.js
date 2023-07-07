'use strict';
const knexHelper = require('../databases/knex')();

async function read(knex, databaseConfiguration) {
  console.info('Reading table...');
  await knexHelper.read(knex, databaseConfiguration);
  console.info('Done!');
}

async function run(knex, databaseConfiguration) {
  try {
    await read(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. read:', error.message);
  }
}

module.exports = run;
