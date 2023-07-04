'use strict';

const { terminateAllConnections, createDatabase } = require('../helpers/knex-helper');

async function run(knex, databaseConfiguration) {
  try {
    await terminateAllConnections(knex, databaseConfiguration);
    await createDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - CREATE-DATABASE - run', error.message);
  }
  await knex.destroy();
}

module.exports = run;
