'use strict';

const listOfGuids = require('../../../src/helpers/list-of-guids-helper');

describe('Testing listOfGuids', () => {
  test('Should be able to return list of guids', () => {
    const result = listOfGuids(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});
