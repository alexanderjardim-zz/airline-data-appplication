const Joi = require('@hapi/joi');
const log = require('../lib/log');

module.exports = class AirlineModel {

    schema() {
        return Joi.object({
            id: Joi.number(),
            name: Joi.string(),
            alias: Joi.string()
                .allow(''),
            IATA: Joi.string()
                .allow(''),
            ICAO: Joi.string()
                .allow(''),
            callSign: Joi.string()
                .allow(''),
            country: Joi.string()
                .allow(''),
            active: Joi.string()
        });
    }

    static fromArray(airlineArray) {
        return new AirlineModel({
            id: airlineArray[0],
            name: airlineArray[1],
            alias: airlineArray[2],
            IATA: airlineArray[3],
            ICAO: airlineArray[4],
            callSign: airlineArray[5],
            country: airlineArray[6],
            active: airlineArray[7]
        });
    }

    constructor(airlineData) {
        log.debug(`Airline data received to build entity => ${JSON.stringify(airlineData)}`);

        const result = this.schema().validate(airlineData);
        if (result.error) {
            throw Error(result.error.message);
        }
        
        this.id = airlineData.id;
        this.name = airlineData.name;
        this.alias = airlineData.alias;
        this.IATA = airlineData.IATA;
        this.ICAO = airlineData.ICAO;
        this.callSign = airlineData.callSign;
        this.country = airlineData.country;
        this.active = airlineData.active;

    }

}