const router = require('./routes/router');
const { mongoose } = require('./config/mongoose');

module.exports = function (server) {
    router.initialize(server);
}