'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../constants');

module.exports = async function createStockTradeTable(knex) {
  const tableName = DATABASE_DEFAULT_TABLES.STOCK_TRADE;
  console.log(`Creating table: ${tableName}`);
  await knex.schema.createTable(tableName, table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.uuid('userGuid').notNullable().index();
    table.string('type').notNullable().index();
    table.string('instrument').notNullable().index();
    table.integer('quantity').notNullable();
    table.decimal('averagePrice', 20, 2).notNullable();
    table.string('status').notNullable().index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
};
