'use strict';

async function terminateAllConnections(knex, databaseConfiguration) {
  console.info('Terminating all database connections');
  if (databaseConfiguration.client === 'pg') {
    await knex.raw(`SELECT pg_terminate_backend(pid)
    FROM pg_stat_get_activity(NULL::integer)
    WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.connection.database}')`);
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    await knex.raw(`SELECT CONCAT('KILL ', id, ';') 
    FROM INFORMATION_SCHEMA.PROCESSLIST 
    WHERE \`User\` = '${databaseConfiguration.connection.user}'
    AND \`Host\` = '${databaseConfiguration.connection.host}'
    AND \`db\` = '${databaseConfiguration.connection.database}';`);
  }
  console.info('Terminated all database connections.');
}

async function createDatabase(knex, databaseConfiguration) {
  if (databaseConfiguration.client === 'pg') {
    const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.connection.database}'
       )`);
    if (isDatabasePresent?.rows?.[0]?.exists) {
      console.info(`Database exists: ${databaseConfiguration.connection.database}`);
      console.info(`Database was not created.`);
      return;
    }
    console.info(`Creating database: ${databaseConfiguration.connection.database}`);
    await knex.raw(`CREATE DATABASE ${databaseConfiguration.connection.database}`);
    console.info(`Created database: ${databaseConfiguration.connection.database}`);
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    const isDatabasePresent = await knex.raw(`SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = '${databaseConfiguration.connection.database}'
    `);
    if (isDatabasePresent?.[0]?.[0]?.SCHEMA_NAME === databaseConfiguration.connection.database) {
      console.info(`Database exists: ${databaseConfiguration.connection.database}`);
      console.info(`Database was not created.`);
      return;
    }
    console.info(`Creating database: ${databaseConfiguration.connection.database}`);
    await knex.raw(`CREATE DATABASE ${databaseConfiguration.connection.database}`);
    console.info(`Created database: ${databaseConfiguration.connection.database}`);
  }
}

async function dropDatabase(knex, databaseConfiguration) {
  if (databaseConfiguration.client === 'pg') {
    const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.connection.database}'
       )`);
    if (isDatabasePresent?.rows?.[0]?.exists) {
      console.info(`Dropping database: ${databaseConfiguration.connection.database}`);
      await knex.raw(`DROP DATABASE ${databaseConfiguration.connection.database}`);
      console.info(`Dropped database: ${databaseConfiguration.connection.database}`);
    } else {
      console.info(`Database does not exists.`);
    }
  } else if (['mysql2'].includes(databaseConfiguration.client)) {
    const isDatabasePresent = await knex.raw(`SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = '${databaseConfiguration.connection.database}'
    `);
    if (isDatabasePresent?.[0]?.[0]?.SCHEMA_NAME === databaseConfiguration.connection.database) {
      console.info(`Dropping database: ${databaseConfiguration.connection.database}`);
      await knex.raw(`DROP DATABASE ${databaseConfiguration.connection.database}`);
      console.info(`Dropped database: ${databaseConfiguration.connection.database}`);
    } else {
      console.info(`Database does not exists.`);
    }
  }
}

module.exports = {
  terminateAllConnections,
  createDatabase,
  dropDatabase
};
