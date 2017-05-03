const test = require('tape');
const main = require('../../client-src/js/main.js');

test('first test', (t) => {
  t.plan(1);

  t.equal(addOne(1), 2, 'addOne to 1 should equal 2');
});
