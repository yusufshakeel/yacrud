'use strict';

module.exports = function PgClient(knex) {
  this.insert = async rows => {
    const tableName = 'customerOrder';
    const dataToInsert = rows.map(row => {
      const { guid, customerGuid, cent, fraction, currency, orderStatus, createdAt, updatedAt } =
        row;
      return `('${guid}','${customerGuid}','${cent}','${fraction}','${currency}','${orderStatus}','${createdAt}','${updatedAt}')`;
    });
    console.log(`Filling table: ${tableName}`);
    await knex.raw(
      `insert into "${tableName}" (guid,"customerGuid",cent,fraction,currency,"orderStatus","createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
    console.log(`Filled table: ${tableName}`);
  };
};
