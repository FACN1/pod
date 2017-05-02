const url = require('url');

const handler = (request, reply) => {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.query.ajax) reply.view('card', {}, { layout: 'spa' });
  else reply.view('card');
};

module.exports = {
  method: 'GET',
  path: '/card',
  handler,
};
