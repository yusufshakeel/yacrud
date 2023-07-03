# yacrud
Yet Another Create Read Update and Delete project.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/yacrud)
[![npm version](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://www.npmjs.com/package/yacrud)
[![npm Downloads](https://img.shields.io/npm/dm/yacrud.svg)](https://www.npmjs.com/package/yacrud)

## Table of Contents

* [Prerequisite](#prerequisite)
* [Getting started](#getting-started)
* [Commands](#commands)

## Prerequisite

* Node (v14 or higher)
* NPM (v6 or higher)
* PostgreSQL (v11 or higher)
* DBeaver (Optional)

## Getting started

## Commands

```shell
yacrud command [-option=value]
```

| Command                | Description                            |
|------------------------|----------------------------------------|
| yacrud version         | Display version.                       |
| yacrud create-database | Creates the default database `yacrud`. |
| yacrud create-tables   | Creates the default tables.            |
| yacrud fill-tables     | Fill the tables with fake values.      |

```
Usage: yacrud command [-option=value]
  
  Commands:
  =========================================
  version               Print the version.
  create-database       Create default database 'yacrud'.
  create-tables         Create default tables.
  fill-tables           Fill the tables with fake values.
  
  Create database:
  ->  yacrud create-database -h=Host -p=PORT [-U=Username] [-P=Password]
  Example:
  ->  yacrud create-database -h=localhost -p=5432
  
  Create tables:
  ->  yacrud create-tables -h=Host -p=PORT [-U=Username] [-P=Password]
  Example:
  ->  yacrud create-tables -h=localhost -p=5432
```

## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/yacrud/blob/main/LICENSE) Copyright (c) 2023 Yusuf Shakeel

### Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)