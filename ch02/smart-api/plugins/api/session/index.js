const plugin = (server, options, next) => {
  server.route(require('./routes/create'));
  next();
};

module.exports.register = plugin;
module.exports.register.attributes = { name: 'session-api', version: '0.0.1' };
