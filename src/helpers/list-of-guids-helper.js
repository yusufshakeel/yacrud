'use strict';
const { v4: uuidV4 } = require('uuid');

module.exports = function listOfGuids(limit = 1) {
  const guids = [];
  for (let i = 1; i <= limit; i++) {
    guids.push(uuidV4());
  }
  return guids;
};
