const  samples = {
    validAirline : {
        id: 1,
        name: "A Sample Airline",
        alias: "ASAir",
        IATA: "AS",
        ICAO: "ASA",
        callSign: "Sample",
        country: "Brazil",
        active: "Y"
    },
    invalidAirline : {
        id: 1,
        name: "A Sample Airline",
        alias: "",
        IATA: "ASAAAA",
        ICAO: "ASA",
        callSign: "Sample",
        country: "Brazil",
        active: "Y"
    }
}

module.exports = samples;