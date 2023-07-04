'use strict';
const seed = require('./seed');
const Client = require('./client');

const insertRows = async (knex, databaseConfiguration) => {
  const client = Client(knex, databaseConfiguration);
  await client.insert(seed());
};

module.exports = { insertRows };
