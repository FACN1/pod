const staticHandler = require('./static');
const homeHandler = require('./home.js');
const cardHandler = require('./card.js');

module.exports = [
  staticHandler,
  homeHandler,
  cardHandler,
];
