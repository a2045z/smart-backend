const Joi = require('joi');
const _ = require('ramda');

const handler = (request, reply) => {
  // Cross plugin communication - consumer part
  //
  // Solution 1: Use server method
  // console.log(request.server.methods.getDB());
  //
  // Solution 2: Use plugin property exposing
  // console.log(request.server.plugins.mongo.getDB());

  // const user = _.props(['username', 'password'], request.payload);
  const filterWithKeys = (pred, obj) =>
    _.pipe(_.toPairs, _.filter(_.apply(pred)), _.fromPairs)(obj);

  const user = filterWithKeys(
    x => _.contains(x, ['username', 'password']),
    request.payload,
  );

  const coll = request.server.methods.getCollection('users');
  coll.insertOne(user, (error, result) => {
    if (error) {
      return reply(error);
    }

    return reply().code(201).header('Location', `/users/${result.insertedId}`);
  });
};

const scheme = {
  payload: {
    username: Joi.string().required().regex(/\w+/),
    password: Joi.string().required(),
  },
};

const route = {
  method: 'POST',
  path: '/users',
  config: {
    validate: scheme,
  },
  handler,
};

module.exports = route;
