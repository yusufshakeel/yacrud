# yacrud
Yet Another Create Read Update and Delete project.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/yacrud)
[![npm version](https://img.shields.io/badge/npm-0.3.0-blue.svg)](https://www.npmjs.com/package/yacrud)
[![npm Downloads](https://img.shields.io/npm/dm/yacrud.svg)](https://www.npmjs.com/package/yacrud)

## Use case

This package is for development and testing purposes.

We can use this to create a test database and some tables and then fill them with fake values.

## Table of Contents

* [Prerequisite](#prerequisite)
* [Getting started](#getting-started)
* [Commands](#commands)

## Prerequisite

* Node (v14 or higher)
* NPM (v6 or higher)
* PostgreSQL (v11 or higher)
* DBeaver (Optional)

#### Localhost

Start the PostgreSQL server and then using `yacrud`.

## Getting started

Install this package globally.

```shell
npm i -g yacrud
```

## Commands

```shell
Usage: yacrud command [-option=value]
  
  Commands:
  =========================================
  version               Print the version.
  init                  This will create the default database, tables and fill the tables.
  create-database       Create default database 'yacrud'.
  create-tables         Create default tables.
  fill-tables           Fill the tables with fake values.
  
  Initialise:
  ->  yacrud init [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
  Example:
  ->  yacrud init
  
  Create database:
  ->  yacrud create-database [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
  Example:
  ->  yacrud create-database
  
  Create tables:
  ->  yacrud create-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
  Example:
  ->  yacrud create-tables
  
  Fill tables:
  ->  yacrud fill-tables [-h=Host] [-p=PORT] [-U=Username] [-P=Password] [-d=databaseName]
  Example:
  ->  yacrud fill-tables
```

#### Default values
| Flag  | Default Value | Note          |
|-------|---------------|---------------|
| -d    | yacrud        | Database name |
| -h    | localhost     | Hostname      |
| -p    | 5432          | Port          |
| -U    |               | Username      |
| -P    |               | Password      |


## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/yacrud/blob/main/LICENSE) Copyright (c) 2023 Yusuf Shakeel

### Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)