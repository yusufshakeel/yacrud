'use strict';
const fs = require('fs');
const dbConfig = require('../configs/db-config');
const knexSetup = require('../setups/knex-setup');
const createDatabase = require('./create-database');
const recreateDatabase = require('./recreate-database');
const dropDatabase = require('./drop-database');
const createTables = require('./create-tables');
const recreateTables = require('./recreate-tables');
const fillTables = require('./fill-tables');
const listTables = require('./list-tables');
const read = require('./read');
const options = require('./options');
const version = require('./version');
const initialise = require('./initialise');
const commandOptionParserHelper = require('../helpers/command-option-parser-helper');
const {
  YACRUD_CONFIG_FILE_PATH,
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

async function allCmd(knex, databaseConfiguration) {
  await recreateDbCmd({ databaseConfiguration });
  await createTables(knex);
  await fillTables(knex, databaseConfiguration);
}

const commandHandlerConfig = ({ knex, databaseConfiguration }) => ({
  all: () => allCmd(knex, databaseConfiguration),
  version: () => version(),
  'create-database': () => createDbCmd({ databaseConfiguration }),
  'recreate-database': () => recreateDbCmd({ databaseConfiguration }),
  'drop-database': () => dropDbCmd({ databaseConfiguration }),
  'create-tables': () => createTables(knex),
  'recreate-tables': () => recreateTables(knex),
  'fill-tables': () => fillTables(knex, databaseConfiguration),
  'list-tables': () => listTables(knex, databaseConfiguration),
  read: () => read(knex, databaseConfiguration)
});

// eslint-disable-next-line complexity
const getConnectionOptions = (parsedCmdOptions, configFileContent) => ({
  host: parsedCmdOptions['-h'] ?? configFileContent?.host ?? dbConfig.host,
  port: parsedCmdOptions['-p'] ?? configFileContent?.port ?? dbConfig.port,
  database: (
    parsedCmdOptions['-d'] ??
    configFileContent?.databaseName?.toLowerCase() ??
    dbConfig.database
  ).toLowerCase(),
  user: parsedCmdOptions['-U'] ?? configFileContent?.username ?? dbConfig.user,
  password: parsedCmdOptions['-P'] ?? configFileContent?.password ?? dbConfig.password
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

const getDbConfig = (cmdOptions, configFileContent) => {
  const parsedCmdOptions = commandOptionParserHelper(cmdOptions);
  const dbClient = parsedCmdOptions['-C'] ?? configFileContent?.client ?? dbConfig.client;
  return {
    connection: getConnectionOptions(parsedCmdOptions, configFileContent),
    client: dbConfig.defaultClientMap[dbClient] ?? 'pg',
    defaultDatabase: dbConfig.defaultDatabaseMap[dbClient] ?? 'postgres',
    selectedDatabase: dbClient,
    readCondition: getReadConditionOptions(parsedCmdOptions),
    writeCondition: getWriteConditionOptions(parsedCmdOptions)
  };
};

const getConfigFile = () => {
  try {
    const fileContent = fs.readFileSync(YACRUD_CONFIG_FILE_PATH, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    // do nothing.
  }
};

module.exports = async function commands(argv) {
  try {
    const configFileContent = getConfigFile();

    const [command, ...cmdOptions] = argv;

    if (!argv.length || argv[0] === '--help' || argv[1] === '--help') {
      const params = argv.length > 1 ? { command: argv[0] } : undefined;
      options(params);
      return;
    }

    if (argv[0] === 'init') {
      await initialise();
      return;
    }

    const databaseConfiguration = getDbConfig(cmdOptions, configFileContent);
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
