'use strict';
const homeDirectory = require('os').homedir();
const configFilePath = `${homeDirectory}/.yacrudrc`;

module.exports = {
  YACRUD_CONFIG_FILE_PATH: configFilePath,
  INITIALISE_DEFAULT_VALUES: {
    DATABASE_TYPES: {
      1: { name: 'PostgreSQL', client: 'pg' },
      2: { name: 'MySQL', client: 'mysql' },
      3: { name: 'MariaDB', client: 'mysql' }
    },
    DATABASE_NAME: 'yacrud',
    PORT: '5432',
    HOST: 'localhost',
    USERNAME: '',
    PASSWORD: ''
  },
  DATABASE_DEFAULT_TABLES: {
    CUSTOMER: 'customer',
    CUSTOMER_ORDER: 'customerOrder',
    MESSAGE: 'message',
    STOCK_TRADE: 'stockTrade'
  },
  DATABASE_DEFAULT_READ_CONDITIONS: {
    LIMIT: 5,
    OFFSET: 0,
    FILTER: ''
  },
  DATABASE_DEFAULT_WRITE_CONDITIONS: {
    NUMBER_OF_ROWS_TO_CREATE: 10000
  },
  SEED_DATA: {
    START_YEAR: 1980,
    TOTAL_MILLISECONDS_IN_A_MINUTE: 60000,
    TOTAL_MILLISECONDS_IN_A_YEAR: 31536000000
  }
};
