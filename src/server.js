const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const handlebars = require('handlebars');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 3000,
});

server.register([inert, vision], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      hbs: handlebars,
    },
    relativeTo: __dirname,
    helpersPath: './views/helpers',
    path: './views',
    layout: 'layout',
    partialsPath: './views/partials',
    layoutPath: './views/layout',
  });

  server.route(routes);
});

module.exports = server;
