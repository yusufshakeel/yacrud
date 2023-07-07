'use strict';

const { terminateAllConnections, createDatabase, dropDatabase } =
  require('../helpers/knex-helper')();

async function run(knex, databaseConfiguration) {
  try {
    await terminateAllConnections(knex, databaseConfiguration);
    await dropDatabase(knex, databaseConfiguration);
    await createDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('ERROR. recreate-database:', error.message);
  }
  await knex.destroy();
}

module.exports = run;
