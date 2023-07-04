'use strict';

const PgClient = require('./pg-client');
const MySqlClient = require('./mysql-client');

module.exports = function Client(knex, databaseConfiguration) {
  const clients = {
    pg: () => new PgClient(knex, databaseConfiguration),
    mysql: () => new MySqlClient(knex, databaseConfiguration)
  };
  return clients[databaseConfiguration.selectedDatabase]();
};
