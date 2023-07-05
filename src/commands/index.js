'use strict';
const dbConfig = require('../configs/db-config');
const knexSetup = require('../setups/knex-setup');
const createDatabase = require('./create-database');
const recreateDatabase = require('./recreate-database');
const dropDatabase = require('./drop-database');
const createTables = require('./create-tables');
const fillTables = require('./fill-tables');
const listTables = require('./list-tables');
const read = require('./read');
const options = require('./options');
const version = require('./version');
const commandOptionParserHelper = require('../helpers/command-option-parser-helper');
const {
  DATABASE_DEFAULT_TABLES,
  DATABASE_DEFAULT_READ_CONDITIONS,
  DATABASE_DEFAULT_WRITE_CONDITIONS
} = require('../constants');

async function recreateDbCmd({ databaseConfiguration }) {
  await recreateDatabase(
    knexSetup({
      client: databaseConfiguration.client,
      connection: {
        ...databaseConfiguration.connection,
        database: databaseConfiguration.defaultDatabase
      }
    }),
    databaseConfiguration
  );
}

async function dropDbCmd({ databaseConfiguration }) {
  await dropDatabase(
    knexSetup({
      client: databaseConfiguration.client,
      connection: {
        ...databaseConfiguration.connection,
        database: databaseConfiguration.defaultDatabase
      }
    }),
    databaseConfiguration
  );
}

async function createDbCmd({ databaseConfiguration }) {
  await createDatabase(
    knexSetup({
      client: databaseConfiguration.client,
      connection: {
        ...databaseConfiguration.connection,
        database: databaseConfiguration.defaultDatabase
      }
    }),
    databaseConfiguration
  );
}

async function initCmd(knex, databaseConfiguration) {
  await recreateDbCmd({ databaseConfiguration });
  await createTables(knex);
  await fillTables(knex, databaseConfiguration);
}

const commandHandlerConfig = ({ knex, databaseConfiguration }) => ({
  init: () => initCmd(knex, databaseConfiguration),
  version: () => version(),
  'create-database': () => createDbCmd({ databaseConfiguration }),
  'recreate-database': () => recreateDbCmd({ databaseConfiguration }),
  'drop-database': () => dropDbCmd({ databaseConfiguration }),
  'create-tables': () => createTables(knex),
  'fill-tables': () => fillTables(knex, databaseConfiguration),
  'list-tables': () => listTables(knex, databaseConfiguration),
  read: () => read(knex, databaseConfiguration)
});

const getConnectionOptions = parsedCmdOptions => ({
  host: parsedCmdOptions['-h'] ?? dbConfig.host,
  port: parsedCmdOptions['-p'] ?? dbConfig.port,
  database: parsedCmdOptions['-d'] ?? dbConfig.database,
  user: parsedCmdOptions['-U'] ?? dbConfig.user,
  password: parsedCmdOptions['-P'] ?? dbConfig.password
});

const getReadConditionOptions = parsedCmdOptions => ({
  table: parsedCmdOptions['-table'] ?? DATABASE_DEFAULT_TABLES.MESSAGE,
  limit: parsedCmdOptions['-limit'] ?? DATABASE_DEFAULT_READ_CONDITIONS.LIMIT,
  offset: parsedCmdOptions['-offset'] ?? DATABASE_DEFAULT_READ_CONDITIONS.OFFSET,
  filter: parsedCmdOptions['-filter'] ?? DATABASE_DEFAULT_READ_CONDITIONS.FILTER
});

const getWriteConditionOptions = parsedCmdOptions => ({
  numberOfRows:
    parsedCmdOptions['-numberOfRows'] ?? DATABASE_DEFAULT_WRITE_CONDITIONS.NUMBER_OF_ROWS_TO_CREATE
});

const getDbConfig = cmdOptions => {
  const parsedCmdOptions = commandOptionParserHelper(cmdOptions);
  const dbClient = parsedCmdOptions['-C'] ?? dbConfig.client;
  return {
    connection: getConnectionOptions(parsedCmdOptions),
    client: dbConfig.defaultClientMap[dbClient] ?? 'pg',
    defaultDatabase: dbConfig.defaultDatabaseMap[dbClient] ?? 'postgres',
    selectedDatabase: dbClient,
    readCondition: getReadConditionOptions(parsedCmdOptions),
    writeCondition: getWriteConditionOptions(parsedCmdOptions)
  };
};

module.exports = async function commands(argv) {
  try {
    const [command, ...cmdOptions] = argv;

    if (!argv.length || argv[0] === '--help' || argv[1] === '--help') {
      const params = argv.length > 1 ? { command: argv[0] } : undefined;
      options(params);
      return;
    }

    const databaseConfiguration = getDbConfig(cmdOptions);
    const knex = knexSetup({
      client: databaseConfiguration.client,
      connection: {
        ...databaseConfiguration.connection
      }
    });

    try {
      const cmdHandler = commandHandlerConfig({ knex, databaseConfiguration })[command];
      if (cmdHandler) {
        await cmdHandler();
      } else {
        console.log(`\nCommand not Found\n\nTry\n➜  yacrud --help\n`);
      }
    } catch (e) {
      console.log('Error', e.message);
    }
    await knex.destroy();
  } catch (e) {
    console.log('Error', e.message);
  }
};
