'use strict';
const knexHelper = require('../helpers/knex-helper');

async function read(knex, databaseConfiguration) {
  console.info('Reading table...');
  await knexHelper.read(knex, databaseConfiguration);
  console.info('Read table.');
}

async function run(knex, databaseConfiguration) {
  try {
    await read(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - LIST-TABLES - run', error.message);
  }
}

module.exports = run;