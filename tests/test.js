const test = require('tape');

test('Testing is working', (t) => {
  t.equal(1, 1, 'One should equal one');
  t.end();
});
require('./server_tests/homepage.test');
require('./server_tests/latestpage.test');
require('./server_tests/searchpage.test');
require('./server_tests/errorhandling.test');
