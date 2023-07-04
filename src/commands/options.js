'use strict';

const commandOptions = `
  Usage: yacrud --help
  Usage: yacrud command [-option=value]
  Usage: yacrud command --help
  
  Default database: PostgreSQL
  Supported: PostgreSQL, MySQL, MariaDB
  
  Commands:
  =========================================
  version               Print the version.
  init                  [Re]create the default database, tables and fill it with fake values.
  create-database       Create the default database 'yacrud'.
  recreate-database     Recreate the default database 'yacrud'.
  drop-database         Drop the default database 'yacrud'.
  create-tables         Create the default tables.
  fill-tables           Fill the default tables with fake values.
  
  +------+---------------+---------------+
  | Flag | Default Value | Note          |
  |------|---------------|---------------|
  | -d   | yacrud        | Database name |
  | -h   | localhost     | Hostname      |
  | -p   | 5432          | Port          |
  | -U   |               | Username      |
  | -P   |               | Password      |
  | -C   | pg            | Client name   |
  +------+---------------+---------------+
  Values for -C flag.
  pg          PostgreSQL
  mysql       MySQL/MariaDB
  
  Example:
  ➜  yacrud init -C=mysql -h=localhost -p=3306 -d=yacrud -U=yusufshakeel -P=root1234
`;

const versionCmd = `Version:
➜  yacrud version

This will print the version.
`;

const initCmd = `Initialise:
➜  yacrud init [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud init

[Re]create the default database, tables and fill it with fake values.

Name of the default database is yacrud.

Set the -d option to use a different database.
`;

const createDatabaseCmd = `Create database:
➜  yacrud create-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud create-database

Create the default database 'yacrud'.

Set the -d option to use a different database.
`;

const recreateDatabaseCmd = `Recreate database:
➜  yacrud recreate-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud recreate-database

Recreate the default database 'yacrud'.

Set the -d option to use a different database.
`;

const dropDatabaseCmd = `Drop database:
➜  yacrud drop-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud drop-database

Drop the default database 'yacrud'.

Set the -d option to use a different database.
`;

const createTablesCmd = `Create tables:
➜  yacrud create-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud create-tables

Create default tables inside default database 'yacrud'.

Pass the -d option if a different database is being used.
`;

const fillTablesCmd = `Fill tables:
➜  yacrud fill-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
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
