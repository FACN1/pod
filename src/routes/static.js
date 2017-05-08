module.exports = {
  method: 'GET',
  path: '/{file*}',
  config: {
    auth: {
      mode: 'optional',
    },
  },
  handler: {
    directory: {
      path: 'public/',
    },
  },
};
