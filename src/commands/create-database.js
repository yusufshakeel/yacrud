'use strict';

const { terminateAllConnections, createDatabase } = require('../helpers/knex-helper');

async function run(knex, databaseConfiguration) {
  try {
    await terminateAllConnections(knex, databaseConfiguration);
    await createDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. create-database:', error.message);
  }
  await knex.destroy();
}

module.exports = run;
