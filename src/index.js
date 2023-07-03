#!/usr/bin/env node
'use strict';
const commands = require('./commands');

commands().catch(e => {
  console.log('Failed to process your request.');
  console.log('Error', e.message);
});
