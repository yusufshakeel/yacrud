'use strict';

const CustomerTableSeed = require('./customer-table/seed');
const CustomerOrderTableSeed = require('./customer-order-table/seed');
const CustomerClient = require('./customer-table/client');
const CustomerOrderClient = require('./customer-order-table/client');

const insertRows = async (knex, databaseConfiguration) => {
  const customerClient = CustomerClient(knex, databaseConfiguration);
  const customerOrderClient = CustomerOrderClient(knex, databaseConfiguration);
  const customerSeed = CustomerTableSeed();
  const customerOrderSeed = CustomerOrderTableSeed(customerSeed.customerGuids);

  await customerClient.insert(customerSeed.rows);
  await customerOrderClient.insert(customerOrderSeed.rows, customerSeed.customerGuids);
};

module.exports = { insertRows };
