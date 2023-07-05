'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../constants');

module.exports = async function createCustomerTable(knex, dropTableIfExists = true) {
  const tableName = DATABASE_DEFAULT_TABLES.CUSTOMER;
  const exists = await knex.schema.hasTable(tableName);
  if (exists) {
    if (!dropTableIfExists) {
      console.log(`Table exists: ${tableName}`);
      console.log(`Table was not created.`);
      return;
    }
    console.log(`Table exists. Dropping table: ${tableName}`);
    await knex.schema.dropTableIfExists(tableName);
    console.log(`Dropped table: ${tableName}`);
  }
  console.log(`Creating table: ${tableName}`);
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName');
    table.string('accountStatus').notNullable().index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};
