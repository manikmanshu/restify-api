const restify = require('restify');
const logger = require('./logger/logs');

var app = require('./app');
const port = process.env.PORT || 8000;

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(port, function () {
  app(server);
  logger.info(`${server.name} listening at ${server.url}`);
});