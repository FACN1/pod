const url = require('url');

const handler = (request, reply) => {
  const parsedUrl = url.parse(request.url);

  if (request.auth.isAuthenticated) {
    const userUUID = request.auth.credentials.uuid;
    // console.log(request.server.app.cache.get);
    // request.server.app.cache.set(userUUID, { hello: 'world' }, 0, (cacheErr) => {
    //   if (cacheErr) console.log(cacheErr);
    // });

    request.server.app.cache.get(userUUID, (err, value) => {
      console.log(value);

      const data = {
        userUUID,
        userInfo: JSON.stringify(value),
      };

      if (parsedUrl.query.ajax) return reply.view('cart', data, { layout: 'spa' });
      return reply.view('cart', data);
    });
  } else {
    reply('Not authorized');
  }
};

module.exports = {
  method: 'GET',
  path: '/cart',
  config: {
    auth: {
      mode: 'optional',
      strategy: 'jwt',
    },
  },
  handler,
};
