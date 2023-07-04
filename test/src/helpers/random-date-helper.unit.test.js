'use strict';

const randomDateHelper = require('../../../src/helpers/random-date-helper');

describe('Testing randomDateHelper', () => {
  test('Should be able to return date time', () => {
    const result = randomDateHelper();
    expect(result.YYYY_MM_DD__HH_MM_SS).toMatch(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
    );
  });
});
