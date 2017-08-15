const handler = (request, reply) => {
  reply('hello session create');
};

const route = {
  method: 'POST',
  path: '/sessions',
  handler,
};

module.exports = route;
