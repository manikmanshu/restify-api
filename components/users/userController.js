var { userAPI } = require('./userAPI');

function createUser(req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // encrypt pwd
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
    };

    userAPI.createUser(user, (err, data) => {
        if (err) {
            res.send(err.status, err.error);
        }
        else {
            res.send(data);
        }
        next();
    });
}

function updateUser(req, res, next) {
    var id = req.params.id;
    var body = req.body;
    userAPI.updateUser(id, body, (err, data) => {
        if (err) {
            res.send(err.status, err.error);
        }
        else {
            res.send(data);
        }
        next();
    });
}

function getUser(req, res, next) {
    var id = req.params.id;
    userAPI.getUser(id, (err, data) => {
        if (err) {
            res.send(err.status, err.error);
        }
        else {
            res.send(data);
        }
        next(err);

    });
}

function getUsers(req, res, next) {
    userAPI.getUsers((err, data) => {
        if (err) {
            res.send(err.status, err.error);
        }
        else {
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
    userAPI.deleteUser(id, (err, data) => {
        if (err) {
            res.send(err.status, err.error);
        }
        else {
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