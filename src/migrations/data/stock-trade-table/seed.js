'use strict';
const { v4: uuidV4 } = require('uuid');
const { getfake } = require('getfake');

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

const getDateTime = randomDate => {
  const year = randomDate.getFullYear();
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const date = randomDate.getDate().toString().padStart(2, '0');
  const hour = randomDate.getHours().toString().padStart(2, '0');
  const minute = randomDate.getMinutes().toString().padStart(2, '0');
  const second = randomDate.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

const tradeTime = () => {
  const dateStart = new Date(
    getfake.number.integer(2000, 2020),
    getfake.number.integer(0, 11),
    getfake.number.integer(1, 28),
    getfake.number.integer(10, 14),
    getfake.number.integer(0, 59),
    getfake.number.integer(0, 59)
  );
  const millisecondsToAdd = getfake.number.integer(1, 50) * 60000;
  const dateEnd = new Date(dateStart.getTime() + millisecondsToAdd);
  return {
    start: getDateTime(dateStart),
    end: getDateTime(dateEnd)
  };
};

module.exports = function seed() {
  const rows = [];
  for (let i = 1; i <= 10000; i++) {
    const userGuid = uuidV4();
    for (let j = 1; j <= getfake.number.integer(1, 10); j++) {
      const guid = uuidV4();
      const type = ['BUY', 'SELL'][getfake.number.integer(0, 1)];
      const instrument = stockSymbol[getfake.number.integer(0, stockSymbol.length - 1)];
      const quantity = getfake.number.integer(1, 1000);
      const averagePrice = getfake.number.float(1, 10000, 2);
      const status = ['PLACED', 'COMPLETED', 'CANCELLED'][getfake.number.integer(0, 2)];
      const dateTime = tradeTime();
      const createdAt = dateTime.start;
      const updatedAt = dateTime.end;

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
  }
  return rows;
};
