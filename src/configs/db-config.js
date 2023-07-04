'use strict';

const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || 5432;
const database = process.env.DATABASE_NAME || 'yacrud';
const user = process.env.DATABASE_USER || '';
const password = process.env.DATABASE_PASSWORD || '';
const client = process.env.DATABASE_CLIENT || 'pg';
const defaultDatabaseMap = {
  pg: 'postgres',
  mysql2: 'mysql'
};

module.exports = {
  host,
  port,
  database,
  user,
  password,
  client,
  defaultDatabaseMap
};
