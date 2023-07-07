'use strict';

const repositories = require('../../../../src/databases/knex');

describe('Testing knex helper', () => {
  const hasTable = jest.fn(() => true);
  const dropTableIfExists = jest.fn();

  const isTablePresent = jest.fn();
  const read = jest.fn();
  const listTables = jest.fn();
  const terminateAllConnections = jest.fn();
  const isDatabasePresent = jest.fn(
    (knex, databaseConfiguration) => databaseConfiguration.connection.database === 'yacrud'
  );

  const Client = jest.fn(() => {
    return { terminateAllConnections, isDatabasePresent, listTables, read, isTablePresent };
  });

  const knexWithoutDatabase = {
    raw: jest.fn(),
    schema: { hasTable, dropTableIfExists }
  };

  const knexWithDatabase = {
    raw: jest.fn(async () => ({ rows: [{ exists: 'yacrud' }] })),
    schema: { hasTable, dropTableIfExists }
  };

  const knexWithNoTable = {
    schema: { hasTable: jest.fn(() => false), dropTableIfExists }
  };

  const databaseConfiguration = {
    connection: {
      database: 'yacrud'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing terminateAllConnections', () => {
    test('Should be able to call terminate all connection', async () => {
      const helper = repositories(Client);
      await helper.terminateAllConnections(knexWithDatabase, databaseConfiguration);
      expect(terminateAllConnections).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing createDatabase', () => {
    describe('When database does not exists', () => {
      test('Should be able to create database', async () => {
        const helper = repositories(Client);
        await helper.createDatabase(knexWithoutDatabase, { connection: { database: 'newdb' } });
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
      });
    });

    describe('When database exists', () => {
      test('Should not create database', async () => {
        const helper = repositories(Client);
        await helper.createDatabase(knexWithDatabase, databaseConfiguration);
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Testing dropDatabase', () => {
    describe('When database does not exists', () => {
      test('Should do nothing', async () => {
        const helper = repositories(Client);
        await helper.dropDatabase(knexWithoutDatabase, { connection: { database: 'newdb' } });
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(0);
      });
    });

    describe('When database exists', () => {
      test('Should drop database', async () => {
        const helper = repositories(Client);
        await helper.dropDatabase(knexWithDatabase, databaseConfiguration);
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledWith('DROP DATABASE yacrud');
      });
    });
  });

  describe('Testing listTables', () => {
    test('Should be able call list tables', async () => {
      const helper = repositories(Client);
      await helper.listTables(knexWithDatabase, databaseConfiguration);
      expect(listTables).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing read', () => {
    test('Should be able call read', async () => {
      const helper = repositories(Client);
      await helper.read(knexWithDatabase, databaseConfiguration);
      expect(read).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing isTablePresent', () => {
    test('Should be able call isTablePresent', async () => {
      const helper = repositories(Client);
      await helper.isTablePresent(knexWithDatabase, 'message');
      expect(hasTable).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing dropTableIfExists', () => {
    describe('If table exists', () => {
      test('Should be able to drop table', async () => {
        const helper = repositories(Client);
        await helper.dropTableIfExists(knexWithDatabase, 'message');
        expect(knexWithDatabase.schema.hasTable).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.schema.dropTableIfExists).toHaveBeenCalledTimes(1);
      });
    });

    describe('If table does not exists', () => {
      test('Should do nothing', async () => {
        const helper = repositories(Client);
        await helper.dropTableIfExists(knexWithNoTable, 'message');
        expect(knexWithNoTable.schema.hasTable).toHaveBeenCalledTimes(1);
        expect(knexWithNoTable.schema.dropTableIfExists).toHaveBeenCalledTimes(0);
      });
    });
  });
});
