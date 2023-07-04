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

// eslint-disable-next-line complexity
module.exports = async function commands(argv) {
  const [command, ...cmdOptions] = argv;

  if (!argv.length || argv[0] === '--help' || argv[1] === '--help') {
    const params = argv.length > 1 ? { command: argv[0] } : undefined;
    options(params);
    return;
  }

  const parsedCmdOptions = commandOptionParserHelper(cmdOptions);

  const dbClient = parsedCmdOptions['-C'] ?? dbConfig.client;
  const databaseConfiguration = {
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
  const knex = knexSetup({
    client: databaseConfiguration.client,
    connection: {
      ...databaseConfiguration.connection
    }
  });

  const commandHandlerConfig = {
    init: ({ knex, databaseConfiguration }) => initCmd(knex, databaseConfiguration),
    version: () => version(),
    'create-database': ({ databaseConfiguration }) => createDbCmd({ databaseConfiguration }),
    'recreate-database': ({ databaseConfiguration }) => recreateDbCmd({ databaseConfiguration }),
    'drop-database': ({ databaseConfiguration }) => dropDbCmd({ databaseConfiguration }),
    'create-tables': ({ knex }) => createTables(knex),
    'fill-tables': ({ knex, databaseConfiguration }) => fillTables(knex, databaseConfiguration)
  };
  try {
    const cmdHandler = commandHandlerConfig[command];
    if (cmdHandler) {
      await cmdHandler({ knex, databaseConfiguration });
    } else {
      console.log(`\nCommand not Found\n\nTry\n➜  yacrud --help\n`);
    }
  } catch (e) {
    console.log('Error', e.message);
  }
  await knex.destroy();
};
