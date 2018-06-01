const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    diameter: {type: Number, required: true},
    mass: {type: Number, required: true},
    dragCoef: {type: Number, required: true},
    motorManu: {type: String, required: true},
    motorLetter: {type: String, required: true},
    motorClass: {type: String, required: true},
    name: {type: String, required: true}
})

module.exports = FlightSchema;