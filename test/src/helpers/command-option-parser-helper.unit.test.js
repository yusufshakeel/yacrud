'use strict';

const commandOptionParserHelper = require('../../../src/helpers/command-option-parser-helper');

describe('Testing commandOptionParserHelper', () => {
  test('Should be able to parse command option', () => {
    const result = commandOptionParserHelper(['-h=localhost']);
    expect(result).toStrictEqual({ '-h': 'localhost' });
  });
});
