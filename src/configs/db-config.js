'use strict';

const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || 5432;
const database = process.env.DATABASE_NAME || 'yacrud';
const user = process.env.DATABASE_USER || '';
const password = process.env.DATABASE_PASSWORD || '';

module.exports = {
  host,
  port,
  database,
  user,
  password
};
