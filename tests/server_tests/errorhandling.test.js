const test = require('tape');
const supertest = require('supertest');
const app = require('../../src/app');

const clientError = test('wrong path return status code 404', (t) => {
  ['a', 'b', 's', 'f'].forEach((e) => {
    supertest(app)
      .get(`/${e}`)
      .expect(404)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 404, 'Status Code should be 404');
      });
  });
  t.end();
});

module.exports = clientError;
