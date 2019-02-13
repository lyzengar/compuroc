const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    diameter: {type: Number, required: true},
    mass: {type: Number, required: true},
    dragCoef: {type: Number, required: true, enum:[0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85]},
    motorManu: {type: String, required: true},
    motorLetter: {type: String, required: true},
    motorClass: {type: String, required: true},
    name: {type: String, required: true}
})

module.exports = FlightSchema;