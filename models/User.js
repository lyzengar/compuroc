const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

var FlightSchema = new mongoose.Schema({
    diameter: {type: Number, required: true},
    mass: {type: Number, required: true},
    dragCoef: {type: Number, required: true},
    motorManu: {type: String, required: true},
    motorLetter: {type: String, required: true},
    motorClass: {type: String, required: true}
})

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    flights: [FlightSchema]
});

UserSchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  });

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', UserSchema)