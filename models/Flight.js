const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    diameter: {type: Number, required: true},
    mass: {type: Number, required: true},
    dragCoef: {type: Number, required: true, enum:[0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85]},
    motorManu: {type: String, required: true, enum:['AeroTech', 'Animal Motor Works', 'Cesaroni Technology', 'Gorilla Rocket Motors', 'Kosdon by Aerotech', 'Loki Research', 'Quest Aerospace']},
    motorLetter: {type: String, required: true, enum:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']},
    motorClass: {type: String, required: true},
    name: {type: String, required: true}
})

module.exports = FlightSchema;