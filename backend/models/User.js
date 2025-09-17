
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type : String,
        default: "http://via.placeholder.com/150",

    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;