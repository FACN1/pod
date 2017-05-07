const staticHandler = require('./static');
const homeHandler = require('./home.js');
const cardHandler = require('./card.js');
const cartHandler = require('./cart.js');
const addItemHandler = require('./additem.js');

module.exports = [
  staticHandler,
  homeHandler,
  cardHandler,
  cartHandler,
  addItemHandler,
];
