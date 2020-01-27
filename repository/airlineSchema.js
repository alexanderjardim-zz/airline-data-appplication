const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
        id: Number,
        name: String,
        alias: String,
        IATA: String,
        ICAO: String,
        callSign: String,
        country: String,
        active: String,
        updatedAt: {
            type: Date,
            default: Date.now
        }
}, {collection: 'Airlines'});

module.exports = airlineSchema;