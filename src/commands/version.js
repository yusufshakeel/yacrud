'use strict';
const packageJson = require('../../package.json');
module.exports = function version() {
  console.log(
    `${packageJson.name} - version ${packageJson.version}\n${packageJson.description}\n${packageJson.homepage}`
  );
};
