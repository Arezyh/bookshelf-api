const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const config = {
  port: 9000, //UBAH KE PORT 9000
  host: 'localhost',
};

const init = async (c) => {
  const server = Hapi.server({
    port: c.port,
    host: c.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  //CODE TEST SERVER BERJALAN
  console.log(`SERVER SEDANG BERJALAN PADA ${server.info.uri}`);

  return server;
};

init(config);