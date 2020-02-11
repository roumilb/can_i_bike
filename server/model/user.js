//Import the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    places: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', UserSchema);