'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../constants');

module.exports = async function createMessageTable(knex) {
  const tableName = DATABASE_DEFAULT_TABLES.MESSAGE;
  console.log(`Creating table: ${tableName}`);
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.string('message').notNullable();
    table.string('status').notNullable().index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};
