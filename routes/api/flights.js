const express = require('express');
const router = express.Router();
const apiProxyController = require('../../controllers/apiProxy');

router.post('/apiProxy', apiProxyController.apiProxy);

module.exports = router;