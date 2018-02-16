const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: { type: String, required: true, minlength: 3, trim: true },
    name: { type: String, required: true, minlength: 2, trim: true },
    password: String,
    city: String,
    country: String,
    phone: String,
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);

module.exports = { User };