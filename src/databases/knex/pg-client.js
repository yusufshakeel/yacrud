'use strict';

module.exports = function PgClient(knex, databaseConfiguration) {
  this.isDatabasePresent = async () => {
    const isPresent = await knex.raw(
      `select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.connection.database}')`
    );
    return isPresent?.rows?.[0]?.exists;
  };

  this.terminateAllConnections = async () => {
    console.info('Terminating all database connections');
    await knex.raw(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_get_activity(NULL::integer) WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.connection.database}')`
    );
    console.info('Terminated all database connections.');
  };

  this.listTables = async () => {
    const isDatabasePresent = await this.isDatabasePresent(knex, databaseConfiguration);
    if (!isDatabasePresent) {
      console.info(`Database does not exists: ${databaseConfiguration.connection.database}`);
      return;
    }
    const result = await knex.raw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`);
    const { rows } = result;
    console.log(rows.map(v => v.tablename));
  };

  this.read = async readCondition => {
    const isDatabasePresent = await this.isDatabasePresent(knex, databaseConfiguration);
    if (!isDatabasePresent) {
      console.info(`Database does not exists: ${databaseConfiguration.connection.database}`);
      return;
    }
    const { table, filter, limit, offset } = readCondition;
    const [columnName, columnValue] = filter ? filter.split(':') : [];
    const whereClause = columnName && columnValue ? `WHERE "${columnName}"='${columnValue}'` : '';
    const result = await knex.raw(
      `SELECT * FROM "${table}" ${whereClause} LIMIT ${limit} OFFSET ${offset}`
    );
    console.log(result?.rows);
  };
};
