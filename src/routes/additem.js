// const url = require('url');
// const path = require('path');
const vision = require('@google-cloud/vision')({

  // The path to key file:
  keyFilename: './googleapikey.json',
});

const handler = (request, reply) => {
  // const parsedUrl = url.parse(request.url);

  // const vision = Vision();

  // // const fileName = path.join(__dirname, '../../public/assets/images/visa.png');
  // console.log('Request payload: ', request.payload);
  // // var encoded = new Buffer(imageFile).toString('base64');
  if (request.auth.isAuthenticated) {
    vision.detectText(request.payload.path)
      .then((results) => {
        const detections = results[0].join();

        let detectionsText = detections.replace(/[^0-9]/g, '').split(' ').join();
        detectionsText = detectionsText.slice(0, detectionsText.length / 2);

        // const barcodeNumber = detectionsText.match('[0-9]{11}([0-9]{2})?')[0];
        console.log('Image text: ', detectionsText);

        return reply(JSON.stringify({
          detectionsText,
        }));
      })
      .catch((err) => {
        console.error('ERROR: ', err);
        return reply(JSON.stringify({ error: 'Internal server error' }));
      });
  } else {
    reply(JSON.stringify({ error: 'Not authorized' }));
  }
/*
  request.payload
  parsedUrl.query.*/

  // if (parsedUrl.query.ajax) reply.view('card', {}, { layout: 'spa' });
  // else reply.view('card');
};

module.exports = {
  method: 'POST',
  path: '/add-item',
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
