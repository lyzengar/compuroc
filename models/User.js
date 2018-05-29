const mongoose = require('mongoose');
const Flight = require('./Flight');

const UserSchema = new mongoose.Schema({
    username: String,
    flights: [Flight]
});

module.exports = mongoose.model('User', UserSchema)