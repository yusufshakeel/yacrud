'use strict';
const PgClient = require('./pg-client');
const MySqlClient = require('./mysql-client');

module.exports = function Client(knex, databaseConfiguration) {
  const clients = {
    pg: () => new PgClient(knex),
    mysql: () => new MySqlClient(knex)
  };
  return clients[databaseConfiguration.selectedDatabase]();
};
