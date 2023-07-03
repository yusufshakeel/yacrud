'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const dbConfig = require('../configs/db-config');
const knexSetup = require('../setups/knex-setup');

async function fillMessageTable(knex) {
  const tableName = 'message';
  const inserts = [];
  for (let i = 1; i <= 10000; i++) {
    const guid = uuidV4();
    const message = getfake.phrase.any();
    const createdAt = getfake.time.utcTimestamp();
    const updatedAt = getfake.time.utcTimestamp();
    inserts.push(`('${guid}','${message}','${createdAt}','${updatedAt}')`);
  }
  console.log(`Filling table: ${tableName}`);
  await knex.raw(
    `insert into ${tableName}(guid,message,"createdAt","updatedAt") values ${inserts.join(',')}`
  );
  console.log(`Filled table: ${tableName}`);
}

async function fillCustomerOrderTable(knex, customerGuids) {
  const tableName = 'customerOrder';
  const inserts = [];
  customerGuids.forEach(customerGuid => {
    const guid = uuidV4();
    const cent = getfake.number.integer(1, 1000000);
    const fraction = 100;
    const currency = 'INR';
    const createdAt = getfake.time.utcTimestamp();
    const updatedAt = getfake.time.utcTimestamp();
    inserts.push(
      `('${guid}','${customerGuid}','${cent}','${fraction}','${currency}','${createdAt}','${updatedAt}')`
    );
  });
  console.log(`Filling table: ${tableName}`);
  await knex.raw(
    `insert into "${tableName}"(guid,"customerGuid",cent,fraction,currency,"createdAt","updatedAt") values ${inserts.join(
      ','
    )}`
  );
  console.log(`Filled table: ${tableName}`);
}

async function fillCustomerTable(knex) {
  const tableName = 'customer';
  const customerGuids = [];
  const inserts = [];
  for (let i = 1; i <= 10000; i++) {
    const guid = uuidV4();
    const password = getfake.hash.sha.sha512();
    const firstName = getfake.name.english.firstName();
    const lastName = getfake.name.english.lastName();
    const createdAt = getfake.time.utcTimestamp();
    const updatedAt = getfake.time.utcTimestamp();
    const email = `${firstName.toLowerCase()}.${getfake.hash.sha.sha1()}@example.com`;
    inserts.push(
      `('${guid}','${email}','${password}','${firstName}','${lastName}','${createdAt}','${updatedAt}')`
    );
    customerGuids.push(guid);
  }
  console.log(`Filling table: ${tableName}`);
  await knex.raw(
    `insert into ${tableName}(guid,email,password,"firstName","lastName","createdAt","updatedAt") values ${inserts.join(
      ','
    )}`
  );
  console.log(`Filled table: ${tableName}`);
  await fillCustomerOrderTable(knex, customerGuids);
}

async function fillTables(knex) {
  await fillMessageTable(knex);
  await fillCustomerTable(knex);
}

async function run(cmdOptions) {
  const databaseConfiguration = {
    host: cmdOptions['-h'] ?? dbConfig.host,
    port: cmdOptions['-p'] ?? dbConfig.port,
    database: cmdOptions['-d'] ?? dbConfig.database,
    user: cmdOptions['-U'] ?? dbConfig.user,
    password: cmdOptions['-P'] ?? dbConfig.password
  };
  const knex = knexSetup({
    client: 'pg',
    connection: {
      ...databaseConfiguration
    }
  });

  try {
    console.info('FILL TABLES...');
    await fillTables(knex);
  } catch (error) {
    console.error('CATCH_BLOCK - FILL-TABLES - run', error.message);
  }
  await knex.destroy();
  console.log('Done!');
}

module.exports = run;
