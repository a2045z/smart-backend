const Hapi = require('hapi');
const _ = require('ramda');

const server = new Hapi.Server();
const port = 23211;

const haltOnError = error => {
  if (error) throw error;
};

let plugins = [
  { register: require('./plugins/api/user') },
  { register: require('./plugins/api/session') },
  { register: require('./plugins/db/mongo') },
  {
    register: require('good'),
    options: {
      ops: {
        interval: 10000,
      },
      reporters: {
        console: [
          {
            module: 'good-console',
          },
          'stdout',
        ],
      },
    },
  },
];

if (process.env.NODE_ENV !== 'production') {
  plugins = _.union(
    [
      { register: require('vision') },
      { register: require('inert') },
      { register: require('lout') },
    ],
    plugins,
  );
}

server.connection({ port });
server.bind({ message: 'hello' });
server.register(plugins, error => {
  haltOnError(error);
  server.start(error => {
    haltOnError(error);
    console.log(`Server starts on port ${port}`);
  });
});
