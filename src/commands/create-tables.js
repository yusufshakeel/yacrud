'use strict';

const knexSetup = require('../setups/knex-setup');

async function createMessageTable(knex) {
  const tableName = 'message';
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
    table.string('message').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
}

async function createCustomerTable(knex) {
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
}

async function createOrderTable(knex) {
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
    table.uuid('customerGuid').notNullable();
    table.integer('cent').notNullable();
    table.integer('fraction').notNullable().defaultTo(1);
    table.string('currency').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
  console.log(`Created table: ${tableName}`);
}

async function createTables(knex) {
  await createMessageTable(knex);
  await createCustomerTable(knex);
  await createOrderTable(knex);
}

async function run(cmdOptions) {
  const databaseConfiguration = {
    host: cmdOptions['-h'],
    port: cmdOptions['-p'],
    database: 'yacrud',
    user: cmdOptions['-U'] ?? '',
    password: cmdOptions['-P'] ?? ''
  };
  const knex = knexSetup({
    client: 'pg',
    connection: {
      ...databaseConfiguration
    }
  });

  try {
    console.info('CREATING TABLES...');
    await createTables(knex);
  } catch (error) {
    console.error('CATCH_BLOCK - CREATE-TABLES - run', error.message);
  }
  await knex.destroy();
  console.log('Done!');
}

module.exports = run;
