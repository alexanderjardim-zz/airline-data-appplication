const log = require('../lib/log');
const schema = require('./airlineSchema');
const mongoose = require('mongoose');
const config = require('../config');

module.exports = class AirlineDao {

    static async create() {
        log.debug('and here');
        try {
            let dao = new AirlineDao();
            await dao.initialize();
            return dao;
        } catch (e) {
            log.error(e);
            return Promise.reject(e);
        }
    }

    async initialize() {
        try {
            await mongoose.connect(config.mongodb.connection, config.mongodb.options, (err) =>{
                if (err) log.error(e);
                else {
                    log.info('Connected to MongoDB');
                    this.model = mongoose.model('Airline', schema);
                }
            });
        } catch (e) {
            log.error('Error connecting to MongoDB', e);
            return Promise.reject(e);
        }
    }

    async save(airlinesArray) {
        try {
            log.debug(airlinesArray);
            await this.model.insertMany(airlinesArray, (err, docs) => {
                if (err) {
                    log.error(`ERROR: ${JSON.stringify(err)} with ${docs}`);
                } else {
                    log.info(`Saved ${docs.length} docs`);
                }
            });

        } catch(e) {
            log.error(e);
            return Promise.reject(e);
        }
    }

    async list() {
        try {
            return await this.model.find();
        } catch(err) {
            log.error('Error acessing MongoDB', err);
            return Promise.reject(err);
        }
    }

}