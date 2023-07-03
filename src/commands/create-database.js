'use strict';

const dbConfig = require('../configs/db-config');
const knexSetup = require('../setups/knex-setup');

async function terminateAllConnections(knex, databaseConfiguration) {
  await knex.raw(`SELECT pg_terminate_backend(pid)
    FROM pg_stat_get_activity(NULL::integer)
    WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.database}')`);
}

async function createDatabase(knex, databaseConfiguration) {
  console.info(`CREATING DATABASE: ${databaseConfiguration.database}`);
  await knex.raw(`CREATE DATABASE ${databaseConfiguration.database}`);
  console.info(`CREATED DATABASE: ${databaseConfiguration.database}`);
}

async function dropDatabase(knex, databaseConfiguration) {
  const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.database}'
       )`);
  if (isDatabasePresent?.rows?.[0]?.exists) {
    console.info(`DROPPING DATABASE: ${databaseConfiguration.database}`);
    await knex.raw(`DROP DATABASE ${databaseConfiguration.database}`);
    console.info(`DROPPED DATABASE! ${databaseConfiguration.database}`);
  }
}

async function run(cmdOptions) {
  const databaseConfiguration = {
    host: cmdOptions['-h'] ?? dbConfig.host,
    port: cmdOptions['-p'] ?? dbConfig.port,
    database: cmdOptions['-d'] ?? dbConfig.database,
    user: cmdOptions['-U'] ?? dbConfig.user,
    password: cmdOptions['-P'] ?? dbConfig.password
  };
  const knex = knexSetup({
    client: 'pg',
    connection: {
      ...databaseConfiguration,
      database: 'postgres'
    }
  });

  try {
    console.info('TERMINATING ALL DATABASE CONNECTIONS...');
    await terminateAllConnections(knex, databaseConfiguration);
    console.info('TERMINATED ALL DATABASE CONNECTIONS.');
    await dropDatabase(knex, databaseConfiguration);
    await createDatabase(knex, databaseConfiguration);
  } catch (error) {
    console.error('CATCH_BLOCK - CREATE-DATABASE - run', error.message);
  }
  await knex.destroy();
  console.log('Done!');
}

module.exports = run;
