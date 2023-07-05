'use strict';

module.exports = {
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
  }
};
