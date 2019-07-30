const test =require('tape');
const supertest = require('supertest');

test('Testing is working', (t) => {
  t.equal(1, 1, 'One should equal one');
  t.end();
});