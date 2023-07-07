'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../../constants');

module.exports = function PgClient(knex) {
  this.insert = async rows => {
    const tableName = DATABASE_DEFAULT_TABLES.STOCK_TRADE;
    const dataToInsert = rows.map(row => {
      const {
        guid,
        userGuid,
        type,
        instrument,
        quantity,
        averagePrice,
        status,
        createdAt,
        updatedAt
      } = row;
      return `('${guid}','${userGuid}','${type}','${instrument}','${quantity}','${averagePrice}','${status}','${createdAt}','${updatedAt}')`;
    });
    await knex.raw(
      `insert into "${tableName}" (guid,"userGuid",type,instrument,quantity,"averagePrice",status,"createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
  };
};
