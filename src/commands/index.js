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
      client: 'pg',
      connection: {
        ...databaseConfiguration,
        database: 'postgres'
      }
    }),
    databaseConfiguration
  );
}

async function dropDbCmd({ databaseConfiguration }) {
  await dropDatabase(
    knexSetup({
      client: 'pg',
      connection: {
        ...databaseConfiguration,
        database: 'postgres'
      }
    }),
    databaseConfiguration
  );
}

async function createDbCmd({ databaseConfiguration }) {
  await createDatabase(
    knexSetup({
      client: 'pg',
      connection: {
        ...databaseConfiguration,
        database: 'postgres'
      }
    }),
    databaseConfiguration
  );
}

async function initCmd(knex, databaseConfiguration) {
  await recreateDbCmd({ databaseConfiguration });
  await createTables(knex);
  await fillTables(knex);
}

module.exports = async function commands() {
  const argv = process.argv.slice(2);
  const [command, ...cmdOptions] = argv;

  if (!argv.length || argv[0] === '--help' || argv[1] === '--help') {
    const params = argv.length > 1 ? { command: argv[0] } : undefined;
    options(params);
    return;
  }

  const parsedCmdOptions = commandOptionParserHelper(cmdOptions);

  const databaseConfiguration = {
    host: parsedCmdOptions['-h'] ?? dbConfig.host,
    port: parsedCmdOptions['-p'] ?? dbConfig.port,
    database: parsedCmdOptions['-d'] ?? dbConfig.database,
    user: parsedCmdOptions['-U'] ?? dbConfig.user,
    password: parsedCmdOptions['-P'] ?? dbConfig.password
  };
  const knex = knexSetup({
    client: 'pg',
    connection: {
      ...databaseConfiguration
    }
  });

  const commandHandlerConfig = {
    init: ({ knex, databaseConfiguration }) => initCmd(knex, databaseConfiguration),
    version: () => version(),
    'create-database': ({ databaseConfiguration }) => createDbCmd({ databaseConfiguration }),
    'recreate-database': ({ databaseConfiguration }) => recreateDbCmd({ databaseConfiguration }),
    'drop-database': ({ databaseConfiguration }) => dropDbCmd({ databaseConfiguration }),
    'create-tables': ({ knex }) => createTables(knex),
    'fill-tables': ({ knex }) => fillTables(knex)
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
