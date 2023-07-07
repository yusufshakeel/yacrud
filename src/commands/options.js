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
  init                  Initialise yacrud.
  all                   [Re]create the default database, tables and fill it with fake values.
  create-database       Create the default database 'yacrud'.
  recreate-database     Recreate the default database 'yacrud'.
  drop-database         Drop the default database 'yacrud'.
  create-tables         Create the default tables.
  recreate-tables       Recreate the default tables.
  fill-tables           Fill the default tables with fake values.
  list-tables           List all the tables.
  read                  Read rows from a table.
  
  Configuration file:
  =========================================
  Run the following command to setup configuration file.
  ➜  yacrud init
  
  The init command creates the .yacrudrc file in the home directory.
  
  Database flags:
  =========================================
  Following are the flags that can be used with the above commands.
  Note! Inline database flags overrides the .yacrudrc flags.
  
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
  
  The database name (-d flag) is always converted to lowercase.
  
  Values for -C flag.
  pg          PostgreSQL
  mysql       MySQL/MariaDB
  
  Example:
  ➜  yacrud init -C=pg -h=localhost -p=5432 -d=yacrud -U=yusufshakeel -P=root1234
  ➜  yacrud init -C=mysql -h=localhost -p=3306 -d=yacrud -U=yusufshakeel -P=root1234
`;

const versionCmd = `Version:
➜  yacrud version

This will print the version.
`;

const allCmd = `All:
➜  yacrud all [-numberOfRows=Number] [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud all

[Re]create the default database, tables and fill it with fake values.

Default:
numberOfRows=10000   Total number of rows to create in the tables.

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

const recreateTablesCmd = `Recreate tables:
➜  yacrud recreate-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud recreate-tables

Recreate default tables inside default database 'yacrud'.

Pass the -d option if a different database is being used.
`;

const fillTablesCmd = `Fill tables:
➜  yacrud fill-tables [-numberOfRows=Number] [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud fill-tables

Fill the default tables with fake values inside default database 'yacrud'.

Default:
numberOfRows=10000   Total number of rows to create in the tables.

Pass the -d option if a different database is being used.
`;

const listTablesCmd = `List tables:
➜  yacrud list-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud list-tables

Fetch tables from the default database 'yacrud'.

Pass the -d option if a different database is being used.
`;

const readRowsATableCmd = `Read rows of a table:
➜  yacrud read [-table=tableName] [-filter=columnName:value] [-limit=Number] [-offset=Number] [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName] [-C=clientName]
Example:
➜  yacrud read -table=message

Fetch rows from a table of the default database 'yacrud'.

Default:
table=message
limit=5
offset=0

The 'filter' flag will filter based on column name and value.

Example:
➜  yacrud read -table=message -filter=guid:28a16df2-07e0-432a-807d-ec58e3791e7d

Pass the -d option if a different database is being used.
`;

const commandHelpMap = {
  version: versionCmd,
  all: allCmd,
  ['create-database']: createDatabaseCmd,
  ['recreate-database']: recreateDatabaseCmd,
  ['drop-database']: dropDatabaseCmd,
  ['create-tables']: createTablesCmd,
  ['recreate-tables']: recreateTablesCmd,
  ['fill-tables']: fillTablesCmd,
  ['list-tables']: listTablesCmd,
  ['read']: readRowsATableCmd
};

module.exports = function options(params = {}) {
  params.command
    ? console.log(commandHelpMap[params.command] ?? '\nCommand not found!\n')
    : console.log(commandOptions);
};
