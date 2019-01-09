var User = require('../models/User');
const Flight = require('../models/Flight');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

function createJWT(user) {
  delete user.flights;
  return jwt.sign(
    {user},
    SECRET,
    //{expiresIn: '24h'}
  );
}

function signup(req, res) {
    var user = new User(req.body);
    user.save()
        .then(user => {
        res.json({token: createJWT(user)});
        })
        .catch(err => res.status(400).json(err));
}

function login(req, res) {
  User.findOne({username: req.body.username}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'Bad Credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        res.json({token: createJWT(user)});
      } else {
        return res.status(401).json({err: 'Bad Credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

function addFlight(req, res) {
  User.findById(req.user._id, function(err, user) {
    user.flights.push(req.body)
    user.save(function(err, user) {
      res.status(200).json({ flights: user.flights})
    })
  })
}

function getFlight(req, res) {
  Flight.findById(req.flight._id, function(err, flight) {
    return res.body;
  })
}

module.exports = {
  signup,
  login,
  addFlight,
  getFlight
};