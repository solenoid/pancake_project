var hapi = require('hapi');
var path = require('path');
var FalcorServer = require('falcor-hapi');

var options = {
  name: 'jazz',
  resourceDir: 'resources'
};

var DIST_DIR = path.join(__dirname, '..', 'dist');
var INDEX_FILE = path.join(DIST_DIR, 'index.html');
var UI_ROUTE_PATH = '/ui/' + options.name + '/{path*}';
var UI_RESOURCE_RE = new RegExp('^' + options.resourceDir);

var server = new hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  }
});

server.connection({
  port: 4000,
  host: 'localhost'
});

// UI SPA Routes
server.route({
  method: 'GET',
  path: UI_ROUTE_PATH,
  handler (request, reply) {
    if (request.params.path && request.params.path.match(UI_RESOURCE_RE)) {
      reply.file(path.join(DIST_DIR, request.params.path));
    } else {
      reply.file(INDEX_FILE);
    }
  }
});

// Custom API endpoint
server.route({
  method: 'GET',
  path: '/api/users.json',
  handler (request, reply) {
    reply(require('./users').USER_DATA);
  }
});

// Falcor API endpoint
var UsersRouter = require('./falcor-router');
server.route({
  method: ['GET', 'POST'],
  path: '/falcor/users.json',
  handler: FalcorServer.dataSourceRoute(function (req, res) {
    return new UsersRouter();
  })
});

server.start(() => {
  console.log('Server started at:');
  console.log(server.info.uri + '/ui/' + options.name);
});
