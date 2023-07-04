'use strict';

const { terminateAllConnections, dropDatabase } = require('../helpers/knex-helper');

async function run(knex, databaseConfiguration) {
  try {
    await terminateAllConnections(knex, databaseConfiguration);
    await dropDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - DROP-DATABASE - run', error.message);
  }
  await knex.destroy();
}

module.exports = run;
