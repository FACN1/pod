const handler = (request, reply) => {
  reply.view('index');
};

module.exports = {
  method: 'GET',
  path: '/',
  handler,
};
