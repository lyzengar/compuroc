var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var usersController = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);



/*---------- Protected Routes ----------*/





module.exports = router;