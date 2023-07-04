'use strict';

module.exports = function PgClient(knex, databaseConfiguration) {
  const isDbPresent = async () => {
    const isPresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.connection.database}'
       )`);
    return isPresent?.rows?.[0]?.exists;
  };

  this.terminateAllConnections = async () => {
    console.info('Terminating all database connections');
    await knex.raw(`SELECT pg_terminate_backend(pid)
      FROM pg_stat_get_activity(NULL::integer)
      WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.connection.database}')`);
    console.info('Terminated all database connections.');
  };

  this.createDatabase = async () => {
    const isDatabasePresent = await isDbPresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Database exists: ${databaseConfiguration.connection.database}`);
      console.info(`Database was not created.`);
      return;
    }
    console.info(`Creating database: ${databaseConfiguration.connection.database}`);
    await knex.raw(`CREATE DATABASE ${databaseConfiguration.connection.database}`);
    console.info(`Created database: ${databaseConfiguration.connection.database}`);
  };

  this.dropDatabase = async () => {
    const isDatabasePresent = await isDbPresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Dropping database: ${databaseConfiguration.connection.database}`);
      await knex.raw(`DROP DATABASE ${databaseConfiguration.connection.database}`);
      console.info(`Dropped database: ${databaseConfiguration.connection.database}`);
    } else {
      console.info(`Database does not exists.`);
    }
  };
};
