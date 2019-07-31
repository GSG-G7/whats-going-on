const test = require('tape');
const supertest = require('supertest');
const app = require('../../src/app');

const searchPageTest = test('search route returns status code 200', (t) => {
  supertest(app)
    .get('/search?query=amd')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'status code should be 200');
      t.isNotEqual(res.body.articles[0].title.toLowerCase().indexOf('amd'), -1, 'the title should at least have the search query');
      t.end();
    });
});

module.exports = searchPageTest;
