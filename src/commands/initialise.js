'use strict';
const fs = require('fs');
const readline = require('readline');
const { INITIALISE_DEFAULT_VALUES, YACRUD_CONFIG_FILE_PATH } = require('../constants');

const selectDatabase = async prompt => {
  let keepLooping = true;
  while (keepLooping) {
    console.log('What is your database type?');
    console.log('[1] PostgreSQL');
    console.log('[2] MySQL');
    console.log('[3] MariaDB');
    const databaseType = await prompt('Choose one of the option: (Default: 1) ');
    if (!['', '1', '2', '3'].includes(databaseType)) {
      console.log('Invalid input. Try again.');
    } else {
      return databaseType;
    }
  }
};

async function run() {
  const readLine = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const prompt = query => new Promise(resolve => readLine.question(query, resolve));

    console.log('This command will help you in creating a .yacrudrc file.');
    console.log('Press ^C at any time to quit.\n');

    const databaseType = await selectDatabase(prompt);
    const databaseName = await prompt('Enter database name: (Default: yacrud) ');
    const host = await prompt('Enter host: (Default: localhost) ');
    const port = await prompt('Enter host: (Default: 5432) ');
    const username = await prompt('Enter database username: ');
    const password = await prompt('Enter database password: ');

    console.log(`About to create ${YACRUD_CONFIG_FILE_PATH} file.`);

    const dbType = INITIALISE_DEFAULT_VALUES.DATABASE_TYPES[databaseType.length ? databaseType : 1];

    const input = {
      databaseType: dbType.name,
      client: dbType.client,
      databaseName: databaseName.length ? databaseName : INITIALISE_DEFAULT_VALUES.DATABASE_NAME,
      host: host.length ? host : INITIALISE_DEFAULT_VALUES.HOST,
      port: port.length ? port : INITIALISE_DEFAULT_VALUES.PORT,
      username: username.length ? username : INITIALISE_DEFAULT_VALUES.USERNAME,
      password: password.length ? password : INITIALISE_DEFAULT_VALUES.PASSWORD
    };

    console.log(JSON.stringify(input, null, 2));

    const isItOkay = await prompt('Is it okay? (yes) ');
    if (isItOkay.toLowerCase() === 'no' || isItOkay.toLowerCase() === 'n') {
      console.log('Aborting...');
      return;
    }

    fs.writeFileSync(YACRUD_CONFIG_FILE_PATH, JSON.stringify(input), 'utf8');
    console.log('Done!');
  } catch (error) {
    console.error('ERROR. init:', error.message);
  }
  readLine.close();
}

module.exports = run;
