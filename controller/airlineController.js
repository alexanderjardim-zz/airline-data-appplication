const restify = require('restify');
const paginate = require('restify-paginate');
const errs = require('restify-errors');
const log = require('../lib/log');
const AirlineService = require('../service/airlineService');

class AirlineController {

    static async create() {
        try {
            let c = new AirlineController();
            c.initialize();
            return c;
        } catch(err) {
            log.error('Error initializing Controller', err);
            return Promise.reject(err);
        }
    }

    async initialize() {
        try {
            this.service = await AirlineService.create();
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async list(req, res, next) {
        log.debug('LISTING');
        log.debug(`${this}`);
        try {
            const entries = await this.service.list();
            res.paginate.send(entries);
            return next();
        } catch (err) {
            res.send(new errs.InternalServerError(err));
            return next();
        }
    }

}

module.exports = AirlineController;