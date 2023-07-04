'use strict';
module.exports = async function createCustomerTable(knex) {
  const tableName = 'customer';
  const exists = await knex.schema.withSchema('public').hasTable(tableName);
  if (exists) {
    console.log(`Table exists. Dropping table: ${tableName}`);
    await knex.schema.withSchema('public').dropTableIfExists(tableName);
    console.log(`Dropped table: ${tableName}`);
  }
  console.log(`Creating table: ${tableName}`);
  await knex.schema.withSchema('public').createTable(tableName, table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};
