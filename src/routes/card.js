// const url = require('url');
// const path = require('path');
const vision = require('@google-cloud/vision')({

  // The path to key file:
  keyFilename: './googleapikey.json',
});
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const handler = (request, reply) => {
  // const parsedUrl = url.parse(request.url);

  // const vision = Vision();

  // // const fileName = path.join(__dirname, '../../public/assets/images/visa.png');
  // console.log('Request payload: ', request.payload);
  // // var encoded = new Buffer(imageFile).toString('base64');

  vision.detectText(request.payload.path)
    .then((results) => {
      const detections = results[0];

      const detectionsText = detections.join('');

      const cardNumber = detectionsText.match('(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})')[0];
      console.log('Image text: ', cardNumber);

      const optionsGet = {
        expiresIn: Date.now() + (24 * 60 * 60 * 1000),
        subject: 'github-data',
      };
      const userUUID = uuid();

      const payload = {
        shop_id: 1,
        uuid: userUUID,
      };
      jwt.sign(payload, process.env.JWT_SECRET, optionsGet, (err, token) => {
        if (err) {
          console.log(err);
          return reply('Internal server error').code(500);
        }
        return request.server.app.cache.set(userUUID, { cardNumber }, 0, (cacheErr) => {
          if (cacheErr) {
            console.log(cacheErr);
            return reply('Internal server error').code(500);
          }


          return reply(JSON.stringify({
            token,
          }));
        });
      });
    })
    .catch((err) => {
      console.error('ERROR: ', err);
    });
/*
  request.payload
  parsedUrl.query.*/

  // if (parsedUrl.query.ajax) reply.view('card', {}, { layout: 'spa' });
  // else reply.view('card');
};

module.exports = {
  method: 'POST',
  path: '/card',
  config: {
    handler,
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true,
    },
    auth: {
      mode: 'optional',
    },
  },
};
