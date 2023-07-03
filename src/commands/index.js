'use strict';
const packageJson = require('../../package.json');
const createDatabase = require('./create-database');
const createTables = require('./create-tables');
const fillTables = require('./fill-tables');

const options = () => {
  return `Usage: yacrud command [-option=value]
  
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
  `;
};

const cmdOptionsParser = cmdOptions => {
  return cmdOptions.reduce((result, current) => {
    const [option, value] = current.split('=');
    return { ...result, [option]: value };
  }, {});
};

module.exports = async function commands() {
  const argv = process.argv.slice(2);
  const [command, ...cmdOptions] = argv;
  if (command === 'version') {
    console.log(
      `${packageJson.name} - version ${packageJson.version}\n${packageJson.description}\n${packageJson.homepage}`
    );
  } else if (command === 'create-database') {
    await createDatabase(cmdOptionsParser(cmdOptions));
  } else if (command === 'create-tables') {
    await createTables(cmdOptionsParser(cmdOptions));
  } else if (command === 'fill-tables') {
    await fillTables(cmdOptionsParser(cmdOptions));
  } else {
    console.log(options());
  }
};
