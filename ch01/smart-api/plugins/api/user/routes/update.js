const handler = (request, reply) => {
  reply('hello update');
};

const route = {
  method: ['PUT', 'PATCH'],
  path: '/users/{id}',
  handler,
};

module.exports = route;
