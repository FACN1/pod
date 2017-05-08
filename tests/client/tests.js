const test = require('tape');
require('../../client-src/js/main.js');

test('first test', (t) => {
  t.plan(1);

  t.equal(1, 1);
});

// window.close();

test.onFinish(() => {
  // if (process) process.exit(0);
  if (window) window.close();
});
