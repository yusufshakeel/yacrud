'use strict';

function getKnex(knexConfig) {
  const pg = require('pg');
  pg.types.setTypeParser(20, 'text', parseInt);
  return require('knex')(knexConfig);
}

module.exports = getKnex;
