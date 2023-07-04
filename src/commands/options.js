'use strict';

const commandOptions = `
  Usage: yacrud --help
  Usage: yacrud command [-option=value]
  Usage: yacrud command --help
  
  Commands:
  =========================================
  version               Print the version.
  init                  This will create/recreate the default database, default tables and fill it with fake values.
  create-database       Create the default database 'yacrud'.
  recreate-database     Recreate the default database 'yacrud'.
  drop-database         Drop the default database 'yacrud'.
  create-tables         Create the default tables.
  fill-tables           Fill the default tables with fake values.
`;

const versionCmd = `Version:
➜  yacrud version

This will print the version.
`;

const initCmd = `Initialise:
➜  yacrud init [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud init

This will create/recreate the default database, default tables and fill it with fake values.

Name of the default database is yacrud.

Set the -d option to use a different database.
`;

const createDatabaseCmd = `Create database:
➜  yacrud create-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud create-database

Create the default database 'yacrud'.

Set the -d option to use a different database.
`;

const recreateDatabaseCmd = `Recreate database:
➜  yacrud recreate-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud recreate-database

Recreate the default database 'yacrud'.

Set the -d option to use a different database.
`;

const dropDatabaseCmd = `Drop database:
➜  yacrud drop-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud drop-database

Drop the default database 'yacrud'.

Set the -d option to use a different database.
`;

const createTablesCmd = `Create tables:
➜  yacrud create-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud create-tables

Create default tables inside default database 'yacrud'.

Pass the -d option if a different database is being used.
`;

const fillTablesCmd = `Fill tables:
➜  yacrud fill-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
Example:
➜  yacrud fill-tables

Fill the default tables with fake values inside default database 'yacrud'.

Pass the -d option if a different database is being used.
`;

const commandHelpMap = {
  version: versionCmd,
  init: initCmd,
  ['create-database']: createDatabaseCmd,
  ['recreate-database']: recreateDatabaseCmd,
  ['drop-database']: dropDatabaseCmd,
  ['create-tables']: createTablesCmd,
  ['fill-tables']: fillTablesCmd
};

module.exports = function options(params = {}) {
  params.command
    ? console.log(commandHelpMap[params.command] ?? '\nCommand not found!\n')
    : console.log(commandOptions);
};
