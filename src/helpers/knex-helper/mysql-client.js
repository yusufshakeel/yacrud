'use strict';

module.exports = function MySqlClient(knex, databaseConfiguration) {
  this.isDatabasePresent = async () => {
    const isPresent = await knex.raw(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${databaseConfiguration.connection.database}'`
    );
    return isPresent?.[0]?.[0]?.SCHEMA_NAME === databaseConfiguration.connection.database;
  };

  this.terminateAllConnections = async () => {
    console.info('Terminating all database connections');
    await knex.raw(
      `SELECT CONCAT('KILL ', id, ';') FROM INFORMATION_SCHEMA.PROCESSLIST WHERE \`User\` = '${databaseConfiguration.connection.user}' AND \`Host\` = '${databaseConfiguration.connection.host}' AND \`db\` = '${databaseConfiguration.connection.database}';`
    );
    console.info('Terminated all database connections.');
  };

  this.listTables = async () => {
    const isDatabasePresent = await this.isDatabasePresent(knex, databaseConfiguration);
    if (!isDatabasePresent) {
      console.info(`Database does not exists: ${databaseConfiguration.connection.database}`);
      return;
    }
    const result = await knex.raw(
      `SELECT table_name FROM information_schema.tables where table_schema='${databaseConfiguration.connection.database}'`
    );
    const rows = result?.[0] ?? [];
    console.log(rows.map(v => v.TABLE_NAME));
  };

  this.read = async readCondition => {
    const isDatabasePresent = await this.isDatabasePresent(knex, databaseConfiguration);
    if (!isDatabasePresent) {
      console.info(`Database does not exists: ${databaseConfiguration.connection.database}`);
      return;
    }
    const { table, filter, limit = 5, offset = 0 } = readCondition;
    const [columnName, columnValue] = filter ? filter.split(':') : [];
    const whereClause = columnName && columnValue ? `WHERE ${columnName}='${columnValue}'` : '';
    const result = await knex.raw(
      `SELECT * FROM ${table} ${whereClause} LIMIT ${limit} OFFSET ${offset}`
    );
    console.log(result?.[0] ?? []);
  };
};
