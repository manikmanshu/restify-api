const restify = require('restify');
const logger =  require('./logger/logs');

const port = process.env.PORT || 8000;

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(port, function () {
  logger.info(`${server.name} listening at ${server.url}`);
});