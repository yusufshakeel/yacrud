'use strict';

const knexHelper = require('../../../../src/helpers/knex-helper');

describe('Testing knex helper', () => {
  const terminateAllConnections = jest.fn();
  const isDatabasePresent = jest.fn(
    (knex, databaseConfiguration) => databaseConfiguration.connection.database === 'yacrud'
  );

  const Client = jest.fn(() => {
    return { terminateAllConnections, isDatabasePresent };
  });

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing terminateAllConnections', () => {
    test('Should be able to call terminate all connection', async () => {
      const helper = knexHelper(Client);
      await helper.terminateAllConnections(knexWithDatabase, databaseConfiguration);
      expect(terminateAllConnections).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing createDatabase', () => {
    describe('When database does not exists', () => {
      test('Should be able to create database', async () => {
        const helper = knexHelper(Client);
        await helper.createDatabase(knexWithoutDatabase, { connection: { database: 'newdb' } });
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(1);
      });
    });

    describe('When database exists', () => {
      test('Should not create database', async () => {
        const helper = knexHelper(Client);
        await helper.createDatabase(knexWithDatabase, databaseConfiguration);
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Testing dropDatabase', () => {
    describe('When database does not exists', () => {
      test('Should do nothing', async () => {
        const helper = knexHelper(Client);
        await helper.dropDatabase(knexWithoutDatabase, { connection: { database: 'newdb' } });
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithoutDatabase.raw).toHaveBeenCalledTimes(0);
      });
    });

    describe('When database exists', () => {
      test('Should drop database', async () => {
        const helper = knexHelper(Client);
        await helper.dropDatabase(knexWithDatabase, databaseConfiguration);
        expect(isDatabasePresent).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledTimes(1);
        expect(knexWithDatabase.raw).toHaveBeenCalledWith('DROP DATABASE yacrud');
      });
    });
  });
});
