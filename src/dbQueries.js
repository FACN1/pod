const dbConnection = require('../database/db_connection');

const dbQueries = {};

dbQueries.getShopCoordinates = (shopId, callback) => {
  dbConnection.query('SELECT location FROM shops WHERE id = $1', [shopId], callback);
};

// dbQueries.getShopCoordinates(1, (err, res) => {
//   if (err) console.log(err);
//   console.log(res.rows[0]);
// });


module.exports = dbQueries;
