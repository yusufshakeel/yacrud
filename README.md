# yacrud
Yet Another Create Read Update and Delete project.

Quickly run CRUD ops and more on databases like PostgreSQL and MySQL locally and in the Cloud.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/yacrud)
[![npm version](https://img.shields.io/badge/npm-0.14.4-blue.svg)](https://www.npmjs.com/package/yacrud)
[![npm Downloads](https://img.shields.io/npm/dm/yacrud.svg)](https://www.npmjs.com/package/yacrud)

> ```shell
> npm i -g yacrud
> ```

## Use case

This package is for development and testing purposes.

We can use this to create a test database and some tables and then fill them with fake values.

## Table of Contents

- [yacrud](#yacrud)
  - [Use case](#use-case)
  - [Table of Contents](#table-of-contents)
  - [Prerequisite](#prerequisite)
      - [Localhost](#localhost)
  - [Getting started](#getting-started)
  - [Commands](#commands)
  - [License](#license)
    - [Donate](#donate)

## Prerequisite

* Node (v14 or higher)
* NPM (v6 or higher)
* Database (any of the following supported database)
  * PostgreSQL (v11 or higher)
  * MySQL (v5 or higher)
  * MariaDB (v9 or higher)
* DBeaver (Optional)
* MySQL Workbench (Optional)

#### Localhost

Start the database server and then use `yacrud`.

## Getting started

Install this package globally.

```shell
npm i -g yacrud
```

## Commands

```
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
```

## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/yacrud/blob/main/LICENSE) Copyright (c) 2023 Yusuf Shakeel

### Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)