const plugin = (server, options, next) => {
  server.route(require('./routes/create'));
  server.route(require('./routes/index'));
  server.route(require('./routes/show'));
  server.route(require('./routes/update'));
  server.route(require('./routes/destroy'));
  next();
};

module.exports.register = plugin;
module.exports.register.attributes = { name: 'user-api', version: '0.0.1' };
