var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

var db = mongoose.connection;

db.once('open', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
    //console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`)
});