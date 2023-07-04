'use strict';
const dbConfig = require('../configs/db-config');
const knexSetup = require('../setups/knex-setup');
const createDatabase = require('./create-database');
const recreateDatabase = require('./recreate-database');
const dropDatabase = require('./drop-database');
const createTables = require('./create-tables');
const fillTables = require('./fill-tables');
const options = require('./options');
const version = require('./version');
const commandOptionParserHelper = require('../helpers/command-option-parser-helper');

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
  'fill-tables': () => fillTables(knex, databaseConfiguration)
});

const getDbConfig = cmdOptions => {
  const parsedCmdOptions = commandOptionParserHelper(cmdOptions);
  const dbClient = parsedCmdOptions['-C'] ?? dbConfig.client;
  return {
    connection: {
      host: parsedCmdOptions['-h'] ?? dbConfig.host,
      port: parsedCmdOptions['-p'] ?? dbConfig.port,
      database: parsedCmdOptions['-d'] ?? dbConfig.database,
      user: parsedCmdOptions['-U'] ?? dbConfig.user,
      password: parsedCmdOptions['-P'] ?? dbConfig.password
    },
    client: dbConfig.defaultClientMap[dbClient] ?? 'pg',
    defaultDatabase: dbConfig.defaultDatabaseMap[dbClient] ?? 'postgres',
    selectedDatabase: dbClient
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
