const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');
const homePageTest = require('./server tests/homepage-test');
const latestPageTest = require('./server tests/latestpage-test');
const searchPageTest = require('./server tests/searchpage-test');


test('Testing is working', (t) => {
  t.equal(1, 1, 'One should equal one');
  t.end();
});
