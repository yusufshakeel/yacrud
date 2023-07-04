'use strict';

module.exports = function PgClient(knex) {
  this.insert = async rows => {
    const tableName = 'stockTrade';
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
    console.log(`Filling table: ${tableName}`);
    await knex.raw(
      `insert into "${tableName}" (guid,"userGuid",type,instrument,quantity,"averagePrice",status,"createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
    console.log(`Filled table: ${tableName}`);
  };
};
