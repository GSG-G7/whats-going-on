const test = require('tape');
const getpublishTimeAgo = require('../public/js/logic');

test('Testing is working', (t) => {
  t.equal(1, 1, 'One should equal one');
  t.end();
});
test('Testing for get publishtimeAgo func', (t) => {
  t.equal(getpublishTimeAgo('2019-07-31T11:15:44Z'), '2 hours ago', 'The result must be 2 hours ago');
  t.end();
});

require('./server_tests/homepage.test');
require('./server_tests/latestpage.test');
require('./server_tests/searchpage.test');
require('./server_tests/errorhandling.test');
