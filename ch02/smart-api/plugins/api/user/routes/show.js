const mongo = require('mongodb');
const Joi = require('joi');

const handler = (request, reply) => {
  const coll = request.server.methods.getCollection('users');
  console.log(request.params);
  coll.findOne(
    { _id: new mongo.ObjectID(request.params.id) },
    (error, user) => {
      reply(user);
    },
  );
};

const validate = {
  params: {
    id: Joi.string().required().regex(/\w+/),
  },
};

const route = {
  method: 'GET',
  path: '/users/{id}',
  config: {
    response: {
      schema: {
        username: Joi.string().required(),
      },
    },
    validate,
  },
  handler,
};

module.exports = route;
