'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../constants');

module.exports = async function createCustomerOrderTable(knex) {
  const tableName = DATABASE_DEFAULT_TABLES.CUSTOMER_ORDER;
  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    console.log(`Table exists. Dropping table: ${tableName}`);
    await knex.schema.dropTableIfExists(tableName);
    console.log(`Dropped table: ${tableName}`);
  }
  console.log(`Creating table: ${tableName}`);
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.uuid('customerGuid').notNullable().index();
    table.integer('cent').notNullable();
    table.integer('fraction').notNullable().defaultTo(1);
    table.string('currency').notNullable();
    table.string('orderStatus').notNullable().index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};
