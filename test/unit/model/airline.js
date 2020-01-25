const AirlineModel = require('../../../model/airline');
const samples = require('../../airlineSamples');
const assert = require('assert');

describe('Airlines model', () => {
    describe('#constructor', () =>{
        it('should create valid airline object', () =>{
            let a = new AirlineModel(samples.validAirline);
            assert.equal(a.name, samples.validAirline.name);
        });
    });
        it('should thow error due to invalid airline entry', () => {
            assert.throws(() => {
                let a = new AirlineModel(samples.invalidAirline);
            });
        });
});