'use strict';
const Client = require('./client');

async function terminateAllConnections(knex, databaseConfiguration) {
  const client = Client(knex, databaseConfiguration);
  await client.terminateAllConnections();
}

async function createDatabase(knex, databaseConfiguration) {
  const client = Client(knex, databaseConfiguration);
  await client.createDatabase();
}

async function dropDatabase(knex, databaseConfiguration) {
  const client = Client(knex, databaseConfiguration);
  await client.dropDatabase();
}

async function listTables(knex, databaseConfiguration) {
  const client = Client(knex, databaseConfiguration);
  await client.listTables();
}

module.exports = {
  terminateAllConnections,
  createDatabase,
  dropDatabase,
  listTables
};
