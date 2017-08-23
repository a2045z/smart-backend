const { MongoClient } = require('mongodb');

const plugin = (server, options, next) => {
  MongoClient.connect(process.env.MONGO_URL, (error, db) => {
    // Cross plugin communication - producer part
    //
    // Solution 1: Use server method
    server.method({
      name: 'getDB',
      method: () => db,
    });

    server.method({
      name: 'getCollection',
      method: name => db.collection(name),
    });

    // Solution 2: Use plugin property exposing
    server.expose('getDB', () => db);

    next();
  });
};

module.exports.register = plugin;
module.exports.register.attributes = { name: 'mongo', version: '0.0.1' };
