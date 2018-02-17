const { userAPI } = require('./userAPI');
const logger = require('./logger/logs');

function createUser(req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // encrypt pwd
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
    };

    logger.info('Creating new user');
    userAPI.createUser(user, (err, data) => {
        if (err) {
            logger.error(`failed to create new user ${err.error}`);
            res.send(err.status, err.error);
        }
        else {
            logger.info('New user is created');
            res.send(data);
        }
        next();
    });
}

function updateUser(req, res, next) {
    var id = req.params.id;
    var body = req.body;
    logger.info('Updating user');
    userAPI.updateUser(id, body, (err, data) => {
        if (err) {
            logger.error(`failed to update user ${err.error}`);
            res.send(err.status, err.error);
        }
        else {
            logger.info('user is updated');
            res.send(data);
        }
        next();
    });
}

function getUser(req, res, next) {
    var id = req.params.id;
    logger.info(`Get user id: ${id}`);
    userAPI.getUser(id, (err, data) => {
        if (err) {
            logger.error(`failed to fetch user ${id}`);
            res.send(err.status, err.error);
        }
        else {
            logger.info('user fetch completed sucessfully');
            res.send(data);
        }
        next(err);

    });
}

function getUsers(req, res, next) {
    logger.info('Get all users');
    userAPI.getUsers((err, data) => {
        if (err) {
            logger.error(`fetch users failed ${err.error}`);
            res.send(err.status, err.error);
        }
        else {
            logger.info('user fetch completed');
            res.send(data);
        }
        next();
    });
}

function getPagedUsers(req, res, next) {
    var skipVal = parseInt(req.params.page, 10),
        limitVal = parseInt(req.params.pageSize, 10),
        skip = isNaN(skipVal) ? 10 : skipVal,
        limit = isNaN(limitVal) ? 0 : limitVal;

    userAPI.getPagedUsers(skip, limit, (err, data) => {
        if (err) {
            logger.error(`failed to get paged data: ${err.error}`);
            res.send(err.status, err.error);
        }
        else {
            res.send(data);
        }
        next();
    });
}

function deleteUser(req, res, next) {
    var id = req.params.id;
    logger.info(`Delete user ${id}`);
    userAPI.deleteUser(id, (err, data) => {
        if (err) {
            logger.error(`failed to delete user. id: ${id}, ${err.error}`);
            res.send(err.status, err.error);
        }
        else {
            logger.info(`user ${id} delete sucessfully`);
            res.send(data);
        }
        next();
    });
}

const userController = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    getPagedUsers
};
module.exports = { userController };