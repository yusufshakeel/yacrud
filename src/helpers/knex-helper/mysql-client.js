'use strict';

module.exports = function MySqlClient(knex, databaseConfiguration) {
  const isDbPresent = async () => {
    const isPresent = await knex.raw(`SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = '${databaseConfiguration.connection.database}'
    `);
    return isPresent?.[0]?.[0]?.SCHEMA_NAME === databaseConfiguration.connection.database;
  };

  this.terminateAllConnections = async () => {
    console.info('Terminating all database connections');
    await knex.raw(`SELECT CONCAT('KILL ', id, ';') 
      FROM INFORMATION_SCHEMA.PROCESSLIST 
      WHERE \`User\` = '${databaseConfiguration.connection.user}'
      AND \`Host\` = '${databaseConfiguration.connection.host}'
      AND \`db\` = '${databaseConfiguration.connection.database}';`);
    console.info('Terminated all database connections.');
  };

  this.createDatabase = async () => {
    const isDatabasePresent = await isDbPresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Database exists: ${databaseConfiguration.connection.database}`);
      console.info(`Database was not created.`);
      return;
    }
    console.info(`Creating database: ${databaseConfiguration.connection.database}`);
    await knex.raw(`CREATE DATABASE ${databaseConfiguration.connection.database}`);
    console.info(`Created database: ${databaseConfiguration.connection.database}`);
  };

  this.dropDatabase = async () => {
    const isDatabasePresent = await isDbPresent(knex, databaseConfiguration);
    if (isDatabasePresent) {
      console.info(`Dropping database: ${databaseConfiguration.connection.database}`);
      await knex.raw(`DROP DATABASE ${databaseConfiguration.connection.database}`);
      console.info(`Dropped database: ${databaseConfiguration.connection.database}`);
    } else {
      console.info(`Database does not exists.`);
    }
  };
};
