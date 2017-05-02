const url = require('url');

const handler = (request, reply) => {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.query.ajax) reply.view('index', {}, { layout: 'spa' });
  else reply.view('index');
};

module.exports = {
  method: 'GET',
  path: '/',
  handler,
};
