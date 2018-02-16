const { User } = require('./userModel');
const { ObjectID } = require('mongodb');


function createUser(userModel, callback) {
    var newUser = new User(userModel);
    newUser.password = newUser.generateHash(userModel.password);

    // check duplicate user
    newUser.save().then((createdUser) => {
        callback(null, createdUser);
    }, (e) => {
        callback({ status: 400, error: e });
    });
}

function updateUser(id, body, callback) {
    if (!ObjectID.isValid(id)) {
        return callback({ status: 404 });
    }
    var userModel = {
        city: body.city,
        country: body.country,
        phone: body.phone
    }
    User.findByIdAndUpdate(id, { $set: userModel }, { new: true })
        .then((user) => {
            if (!user) {
                return callback({ status: 404 });
            }
            callback(null, { user });
        }).catch((e) => {
            callback({ status: 400, error: e });
        });
}

function getUser(id, callback) {
    if (!ObjectID.isValid(id)) {
        return callback({ status: 404 });
    }
    User.findById(id)
        .then((user) => {
            if (!user) {
                return callback({ status: 404 });
            }
            callback(null, { user });
        }).catch((e) => {
            return callback({ error: e, status: 400 });
        });
}

function getUsers(callback) {
    User.find()
        .then((users) => {
            if (!users) {
                return callback({ status: 404 });
            }
            callback(null, { users });
        }).catch((e) => {
            return callback({ error: e, status: 400 });
        });
}

function getPagedUsers(skip, limit, callback) {
    User.count()
        .then((count) => {
            User.find()
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit)
                .then((users) => {
                    callback(null, { users, count });
                })
        }).catch((e) => {
            callback({ status: 400, error: e });
        })
}

function deleteUser(id, callback) {
    if (!ObjectID.isValid(id)) {
        return callback({ status: 404 });
    }
    User.findByIdAndRemove(id)
        .then((user) => {
            if (!user) {
                return callback({ status: 404 });
            }
            callback(null, { user });
        }).catch((e) => {
            callback({ status: 400, error: e });
        });
}

const userAPI = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    getPagedUsers
};
module.exports = { userAPI };