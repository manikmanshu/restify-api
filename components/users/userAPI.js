const { User } = require('./userModel');
const { ObjectID } = require('mongodb');


/**
 * Create new user
 * @param {user} userModel 
 * @param {*} callback err first callback
 */
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

/**
 * Update existing user
 * @param {string} id 
 * @param {user} body 
 * @param {*} callback err first callback
 */
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

/**
 * Fetch a user
 * @param {string} id 
 * @param {*} callback err first callback
 */
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

/**
 * Get all users
 * @param {*} callback error first callback
 */
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

/**
 * 
 * @param {Number} skip document to skip
 * @param {Number} limit page size
 * @param {*} callback error first callback
 * Fetch User with size limit
 */
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

/**
 * Delete a user 
 * @param {string} id 
 * @param {*} callback error first callback
 */
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