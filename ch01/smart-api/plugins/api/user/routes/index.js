const Joi = require('joi');

const handler = (request, reply) => {
  const coll = request.server.methods.getCollection('users');
  coll.find().toArray((error, docs) => {
    reply(docs);
  });
};

const route = {
  method: 'GET',
  path: '/users',
  // config: {
  //   response: {
  //     schema: Joi.array().items(
  //       Joi.object({
  //         username: Joi.string().required(),
  //       }),
  //     ),
  //   },
  // },
  handler,
};

module.exports = route;
