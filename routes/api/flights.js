const express = require('express');
const router = express.Router();
const apiProxyController = require('../../controllers/apiProxy');

router.post('/apiProxy', apiProxyController.apiProxy);
router.post('/apiProxy/motor', apiProxyController.apiProxyMotor);

module.exports = router;