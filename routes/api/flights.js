const express = require('express');
const router = express.Router;
const flightsController = require('../../controllers/flights');

router.get('/', flightsController.index);
router.post('/', flightsController.create);
router.get('/:flight_id', flightsController.show);
router.delete('/:flight_id', flightsController.destroy);

module.exports = router;