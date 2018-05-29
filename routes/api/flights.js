const express = require('express');
const router = express.Router;
const flightsController = require('../../controllers/flights');

router.get('/api/flights', flightsController.index);
router.post('/api/flights', flightsController.create);
router.get('/api/flights/:flight_id', flightsController.show);
router.put('/api/flights/:flight_id', flightsController.update);
router.delete('/api/flights/:flight_id', flightsController.destroy);

module.exports = router;