'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');
const listOfGuids = require('../../../helpers/list-of-guids-helper');
const randomDateHelper = require('../../../helpers/random-date-helper');

const stockSymbol = [
  'ADANIENT',
  'ADANIPORTS',
  'APOLLOHOSP',
  'ASIANPAINT',
  'AXISBANK',
  'BAJAJ-AUTO',
  'BAJFINANCE',
  'BAJAJFINSV',
  'BPCL',
  'BHARTIARTL',
  'BRITANNIA',
  'CIPLA',
  'COALINDIA',
  'DIVISLAB',
  'DRREDDY',
  'EICHERMOT',
  'GRASIM',
  'HCLTECH',
  'HDFCBANK',
  'HDFCLIFE',
  'HEROMOTOCO',
  'HINDALCO',
  'HINDUNILVR',
  'HDFC',
  'ICICIBANK',
  'ITC',
  'INDUSINDBK',
  'INFY',
  'JSWSTEEL',
  'KOTAKBANK',
  'LT',
  'M&M',
  'MARUTI',
  'NTPC',
  'NESTLEIND',
  'ONGC',
  'POWERGRID',
  'RELIANCE',
  'SBILIFE',
  'SBIN',
  'SUNPHARMA',
  'TCS',
  'TATACONSUM',
  'TATAMOTORS',
  'TATASTEEL',
  'TECHM',
  'TITAN',
  'UPL',
  'ULTRACEMCO',
  'WIPRO'
];

module.exports = function seed({ numberOfRows }) {
  const rows = [];
  const userGuids = listOfGuids(numberOfRows);
  for (let i = 1; i <= numberOfRows; i++) {
    const userGuid = userGuids[getfake.number.integer(0, userGuids.length - 1)];
    const guid = uuidV4();
    const type = ['BUY', 'SELL'][getfake.number.integer(0, 1)];
    const instrument = stockSymbol[getfake.number.integer(0, stockSymbol.length - 1)];
    const quantity = getfake.number.integer(1, 1000);
    const averagePrice = getfake.number.float(1, 10000, 2);
    const status = ['PLACED', 'COMPLETED', 'CANCELLED'][getfake.number.integer(0, 2)];
    const dateTime = randomDateHelper();
    const createdAt = dateTime.startDate;
    const updatedAt = dateTime.endDate;

    rows.push({
      guid,
      userGuid,
      type,
      instrument,
      quantity,
      averagePrice,
      status,
      createdAt,
      updatedAt
    });
  }
  return rows;
};
