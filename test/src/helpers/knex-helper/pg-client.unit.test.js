'use strict';

const PgClient = require('../../../../src/helpers/knex-helper/pg-client');

describe('Testing PgClient', () => {
  const knexWithoutDatabase = {
    raw: jest.fn()
  };
  const knexWithDatabase = {
    raw: jest.fn(async () => ({ rows: [{ exists: 'yacrud' }] }))
  };

  const databaseConfiguration = {
    connection: {
      database: 'yacrud'
    }
  };

  const pgClientWithoutDatabase = new PgClient(knexWithoutDatabase, databaseConfiguration);
  const pgClientWithDatabase = new PgClient(knexWithDatabase, databaseConfiguration);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to test if database exists', async () => {
    await pgClientWithDatabase.isDatabasePresent();
    expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
    expect(knexWithDatabase.raw).toHaveBeenCalledWith(
      "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
    );
  });

  test('Should be able to terminate all database connection', async () => {
    await pgClientWithDatabase.terminateAllConnections();
    expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
    expect(knexWithDatabase.raw).toHaveBeenCalledWith(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_get_activity(NULL::integer) WHERE datid=(SELECT oid from pg_database where datname = 'yacrud')"
    );
  });

  describe('List tables', () => {
    describe('When database is not present', () => {
      test('Should not run select query', async () => {
        await pgClientWithoutDatabase.listTables();
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledWith(
          "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
        );
      });
    });

    describe('When database is present', () => {
      test('Should run select query', async () => {
        await pgClientWithDatabase.listTables();
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
        expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
          1,
          "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
        );
        expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
          2,
          "SELECT tablename FROM pg_tables WHERE schemaname='public'"
        );
      });
    });
  });

  describe('Read table rows', () => {
    describe('When database is not present', () => {
      test('Should not run select query', async () => {
        await pgClientWithoutDatabase.read({ table: 'message', limit: 1, offset: 0, filter: '' });
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledWith(
          "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
        );
      });
    });

    describe('When database is present', () => {
      describe('When filter is not defined', () => {
        test('Should run select query', async () => {
          await pgClientWithDatabase.read({ table: 'message', limit: 1, offset: 0, filter: '' });
          expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            1,
            "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
          );
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            2,
            'SELECT * FROM "message"  LIMIT 1 OFFSET 0'
          );
        });
      });

      describe('When filter is defined', () => {
        test('Should run select query', async () => {
          await pgClientWithDatabase.read({
            table: 'message',
            limit: 1,
            offset: 0,
            filter: 'id:1'
          });
          expect(knexWithDatabase.raw).toHaveBeenCalledTimes(2);
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            1,
            "select exists(SELECT datname FROM pg_catalog.pg_database WHERE datname = 'yacrud')"
          );
          expect(knexWithDatabase.raw).toHaveBeenNthCalledWith(
            2,
            `SELECT * FROM "message" WHERE "id"='1' LIMIT 1 OFFSET 0`
          );
        });
      });
    });
  });
});
