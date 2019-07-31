const test = require('tape');
const supertest = require('supertest');
const app = require('../../src/app');

const homePageTest = test('Home root return status code 200', (t) => {
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

module.exports = homePageTest;
