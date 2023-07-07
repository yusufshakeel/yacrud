'use strict';

const { terminateAllConnections, dropDatabase } = require('../helpers/knex-helper');

async function run(knex, databaseConfiguration) {
  try {
    await terminateAllConnections(knex, databaseConfiguration);
    await dropDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. drop-database:', error.message);
  }
  await knex.destroy();
}

module.exports = run;
