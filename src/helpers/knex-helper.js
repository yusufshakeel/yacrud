'use strict';

async function terminateAllConnections(knex, databaseConfiguration) {
  console.info('Terminating all database connections');
  await knex.raw(`SELECT pg_terminate_backend(pid)
    FROM pg_stat_get_activity(NULL::integer)
    WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.database}')`);
  console.info('Terminated all database connections.');
}

async function createDatabase(knex, databaseConfiguration) {
  const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.database}'
       )`);
  if (isDatabasePresent?.rows?.[0]?.exists) {
    console.info(`Database exists: ${databaseConfiguration.database}`);
    console.info(`Database was not created.`);
    return;
  }
  console.info(`Creating database: ${databaseConfiguration.database}`);
  await knex.raw(`CREATE DATABASE ${databaseConfiguration.database}`);
  console.info(`Created database: ${databaseConfiguration.database}`);
}

async function dropDatabase(knex, databaseConfiguration) {
  const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.database}'
       )`);
  if (isDatabasePresent?.rows?.[0]?.exists) {
    console.info(`Dropping database: ${databaseConfiguration.database}`);
    await knex.raw(`DROP DATABASE ${databaseConfiguration.database}`);
    console.info(`Dropped database: ${databaseConfiguration.database}`);
  } else {
    console.info(`Database does not exists.`);
  }
}

module.exports = {
  terminateAllConnections,
  createDatabase,
  dropDatabase
};
