const test = require('tape');
const supertest = require('supertest');
const app = require('../src/app');


test('Testing is working', (t) => {
  t.equal(1, 1, 'One should equal one');
  t.end();
});
test('Home root return status code 200', (t) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Status Code should be 200');
      t.end();
    });
});

test('latest news root return status code 200', (t) => {
  supertest(app)
    .get('/latest')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Status Code should be 200');
      t.end();
    });
});
