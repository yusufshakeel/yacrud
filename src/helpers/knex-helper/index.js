'use strict';
const Client = require('./client');

function knexHelperProxy() {
  async function terminateAllConnections(knex, databaseConfiguration) {
    const client = Client(knex, databaseConfiguration);
    await client.terminateAllConnections();
  }

  async function createDatabase(knex, databaseConfiguration) {
    const client = Client(knex, databaseConfiguration);
    const isDatabasePresent = await client.isDatabasePresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Database exists: ${databaseConfiguration.connection.database}`);
      console.info(`Database was not created.`);
      return;
    }
    console.info(`Creating database: ${databaseConfiguration.connection.database}`);
    await knex.raw(`CREATE DATABASE ${databaseConfiguration.connection.database}`);
    console.info(`Created database: ${databaseConfiguration.connection.database}`);
  }

  async function dropDatabase(knex, databaseConfiguration) {
    const client = Client(knex, databaseConfiguration);
    const isDatabasePresent = await client.isDatabasePresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Dropping database: ${databaseConfiguration.connection.database}`);
      await knex.raw(`DROP DATABASE ${databaseConfiguration.connection.database}`);
      console.info(`Dropped database: ${databaseConfiguration.connection.database}`);
    } else {
      console.info(`Database does not exists.`);
    }
  }

  async function listTables(knex, databaseConfiguration) {
    const client = Client(knex, databaseConfiguration);
    await client.listTables();
  }

  async function read(knex, databaseConfiguration) {
    const client = Client(knex, databaseConfiguration);
    await client.read(databaseConfiguration.readCondition);
  }

  async function isTablePresent(knex, tableName) {
    const exists = await knex.schema.hasTable(tableName);
    return !!exists;
  }

  async function dropTableIfExists(knex, tableName) {
    const exists = await isTablePresent(knex, tableName);
    if (exists) {
      console.log(`Table exists. Dropping table: ${tableName}`);
      await knex.schema.dropTableIfExists(tableName);
      console.log(`Dropped table: ${tableName}`);
    }
  }

  return {
    terminateAllConnections,
    createDatabase,
    dropDatabase,
    listTables,
    read,
    dropTableIfExists,
    isTablePresent
  };
}

module.exports = knexHelperProxy();
