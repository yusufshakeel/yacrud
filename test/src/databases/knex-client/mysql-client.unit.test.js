'use strict';

const MySqlClient = require('../../../../src/databases/knex/mysql-client');

describe('Testing MySqlClient', () => {
  const knexWithoutDatabase = {
    raw: jest.fn()
  };
  const knexWithDatabase = {
    raw: jest.fn(async () => [[{ SCHEMA_NAME: 'yacrud' }]])
  };

  const databaseConfiguration = {
    connection: {
      database: 'yacrud'
    }
  };

  const mysqlClientWithoutDatabase = new MySqlClient(knexWithoutDatabase, databaseConfiguration);
  const mysqlClientWithDatabase = new MySqlClient(knexWithDatabase, databaseConfiguration);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to test if database exists', async () => {
    await mysqlClientWithDatabase.isDatabasePresent();
    expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
    expect(knexWithDatabase.raw).toHaveBeenCalledWith(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
    );
  });

  test('Should be able to terminate all database connection', async () => {
    await mysqlClientWithDatabase.terminateAllConnections();
    expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
    expect(knexWithDatabase.raw).toHaveBeenCalledWith(
      "SELECT CONCAT('KILL ', id, ';') FROM INFORMATION_SCHEMA.PROCESSLIST WHERE `User` = 'undefined' AND `Host` = 'undefined' AND `db` = 'yacrud';"
    );
  });

  describe('List tables', () => {
    describe('When database is not present', () => {
      test('Should not run select query', async () => {
        await mysqlClientWithoutDatabase.listTables();
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledWith(
          "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
        );
      });
    });

    describe('When database is present', () => {
      test('Should run select query', async () => {
        await mysqlClientWithDatabase.listTables();
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
        expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
          1,
          "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
        );
        expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
          2,
          "SELECT table_name FROM information_schema.tables where table_schema='yacrud'"
        );
      });
    });
  });

  describe('Read table rows', () => {
    describe('When database is not present', () => {
      test('Should not run select query', async () => {
        await mysqlClientWithoutDatabase.read({
          table: 'message',
          limit: 1,
          offset: 0,
          filter: ''
        });
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledWith(
          "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
        );
      });
    });

    describe('When database is present', () => {
      describe('When filter is not defined', () => {
        test('Should run select query', async () => {
          await mysqlClientWithDatabase.read({ table: 'message', limit: 1, offset: 0, filter: '' });
          expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            1,
            "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
          );
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            2,
            'SELECT * FROM message  LIMIT 1 OFFSET 0'
          );
        });
      });

      describe('When filter is defined', () => {
        test('Should run select query', async () => {
          await mysqlClientWithDatabase.read({
            table: 'message',
            limit: 1,
            offset: 0,
            filter: 'id:1'
          });
          expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            1,
            "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'yacrud'"
          );
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            2,
            `SELECT * FROM message WHERE id='1' LIMIT 1 OFFSET 0`
          );
        });
      });
    });
  });
});
