'use strict';
const { DATABASE_DEFAULT_TABLES } = require('../../../constants');

module.exports = function PgClient(knex) {
  this.insert = async rows => {
    const tableName = DATABASE_DEFAULT_TABLES.MESSAGE;
    const dataToInsert = rows.map(row => {
      const { guid, message, status, createdAt, updatedAt } = row;
      return `('${guid}','${message}','${status}','${createdAt}','${updatedAt}')`;
    });
    await knex.raw(
      `insert into ${tableName} (guid,message,status,"createdAt","updatedAt") values ${dataToInsert.join(
        ','
      )}`
    );
  };
};
