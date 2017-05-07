const fs = require('fs');
const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const handlebars = require('handlebars');
const jwt = require('hapi-auth-jwt2');

const server = new hapi.Server();

const tls = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem'),
};

server.connection({
  port: process.env.PORT || 3000,
  tls,
});

const jwtValidate = (decoded, request, callback) => {
  // check (hardcoded) shop ID is valid
  if (!(decoded.shop_id === 1)) {
    return callback(null, false);
  }
  return callback(null, true);
};


server.register([inert, vision, jwt], (err) => {
  if (err) throw err;

  const cache = server.cache({ segment: 'sessions', expiresIn: 60 * 60 * 1000 });
  server.app.cache = cache;

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validateFunc: jwtValidate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');

  server.views({
    engines: {
      hbs: handlebars,
    },
    relativeTo: __dirname,
    helpersPath: './views/helpers',
    path: './views',
    layout: 'default',
    partialsPath: './views/partials',
    layoutPath: './views/layout',
  });

  server.route(routes);
});

module.exports = server;
