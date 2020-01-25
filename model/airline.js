const Joi = require('@hapi/joi');
const log = require('../lib/log');

module.exports = class AirlineModel {

    schema() {
        return Joi.object({
            id: Joi.number(),
            name: Joi.string(),
            alias: Joi.string(),
            IATA: Joi.string()
                .minimum(2)
                .maximum(2),
            ICAO: Joi.string()
                .minimum(3)
                .maximum(3),
            callSign: Joi.string(),
            country: Joi.string(),
            active: Joi.string()
        });
    }

    constructor(airlineData) {
        log.debug(`Airline data received to build entity => ${JSON.stringify(airlineData)}`);
        try {
            this.schema().validate(airlineData);
            this.id = airlineData.id;
            this.name = airlineData.name;
            this.alias = airlineData.alias;
            this.IATA = airlineData.IATA;
            this.ICAO = airlineData.ICAO;
            this.callSign = airlineData.callSign;
            this.country = airlineData.country;
            this.active = airlineData.active;
        } catch(e) {
            log.error(`Could not create Airline entity`, e);
        }

    }

}