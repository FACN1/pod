const url = require('url');
// const path = require('path');
const vision = require('@google-cloud/vision')({

  // The path to key file:
  keyFilename: './googleapikey.json',
});

const handler = (request, reply) => {
  const parsedUrl = url.parse(request.url);

  // const vision = Vision();

  // // const fileName = path.join(__dirname, '../../public/assets/images/visa.png');
  // console.log('Request payload: ', request.payload);
  // // var encoded = new Buffer(imageFile).toString('base64');

  vision.detectText(request.payload.path)
    .then((results) => {
      const detections = results[0];

      console.log('Image text: ');
      detections.forEach(text => console.log(text));
    })
    .catch((err) => {
      console.error('ERROR: ', err);
    });
/*
  request.payload


  parsedUrl.query.*/

  if (parsedUrl.query.ajax) reply.view('card', {}, { layout: 'spa' });
  else reply.view('card');
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
  },
};
