'use strict';

module.exports = function MySqlClient(knex) {
  this.insert = async rows => {
    const tableName = 'customer';
    const dataToInsert = rows.map(row => {
      const { guid, password, firstName, lastName, accountStatus, createdAt, updatedAt, email } =
        row;
      return `("${guid}","${email}","${password}","${firstName}","${lastName}","${accountStatus}","${createdAt}","${updatedAt}")`;
    });
    console.log(`Filling table: ${tableName}`);
    await knex.raw(
      `insert into ${tableName} (guid,email,password,firstName,lastName,accountStatus,createdAt,updatedAt) values ${dataToInsert.join(
        ','
      )}`
    );
    console.log(`Filled table: ${tableName}`);
  };
};
