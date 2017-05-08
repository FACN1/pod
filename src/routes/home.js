const url = require('url');
const dbQueries = require('../dbQueries.js');

const handler = (request, reply) => {
  dbQueries.getShopCoordinates(1, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    const data = {
      shopCoordinates: JSON.stringify(res.rows[0]),
    };

    const parsedUrl = url.parse(request.url);
    if (parsedUrl.query.ajax) reply.view('index', data, { layout: 'spa' });
    else reply.view('index', data);
  });
};

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: {
      mode: 'optional',
    },
  },
  handler,
};
