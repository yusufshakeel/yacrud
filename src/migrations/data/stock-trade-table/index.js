'use strict';
const seed = require('./seed');
const Client = require('./client');

const insertRows = async (knex, databaseConfiguration, numberOfRows) => {
  const client = Client(knex, databaseConfiguration);
  await client.insert(seed({ numberOfRows }));
};

module.exports = { insertRows };
