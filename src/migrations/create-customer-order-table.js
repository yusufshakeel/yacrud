'use strict';
module.exports = async function createOrderTable(knex) {
  const tableName = 'customerOrder';
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
    table.uuid('customerGuid').notNullable().index();
    table.integer('cent').notNullable();
    table.integer('fraction').notNullable().defaultTo(1);
    table.string('currency').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};