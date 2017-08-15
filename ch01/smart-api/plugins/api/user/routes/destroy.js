const handler = (request, reply) => {
  reply('hello destroy');
};

const route = {
  method: 'DELETE',
  path: '/users/{id}',
  handler,
};

module.exports = route;
