const csv = require('fast-csv');
const https = require('https');
const fs = require('fs');
const log = require('../lib/log');
const AirlineModel = require('../model/airlineModel');
const AirlineDao = require('../repository/airlineDao');

module.exports = class AirlineService {

    async initialize() {
        try { 
            log.debug('hohohohohohoh');
            this.dao = await AirlineDao.create();
            log.debug(`DAO: ${typeof this.dao}`);
        } catch(err) {
            log.error('Error initializing service', err);
            return Promise.reject(err);
        }
    }

    static async create() {
        try {
            log.debug('heheheheh');
            let service = new AirlineService();
            await service.initialize();
            return service;
        } catch(err) {
            log.error(err);
            return Promise.reject(err);
        }   
    }

    async load() {
        try {
            await this.download(this.parseFile);
        } catch(err) {
            log.error(err.message);
            return Promise.reject(e);
        }

    }

    async download(localCallback) {
        try {
            const options = {
                host: 'raw.githubusercontent.com',
                path: 'jpatokal/openflights/master/data/airlines.dat',
            };

            let file = await fs.createWriteStream("/tmp/airlines.dat")
                .on('finish', localCallback);
            await https.get(options, (res) => {
                res.pipe(file);
            });

        } catch (err) {
            log.error(err.message);
            return Promise.reject(e);
        }

    }

    async parseFile() {

        try {
            let dataArray = [];

            var stream = await fs.createReadStream('/tmp/airlines.dat')
                .pipe(csv.parse())
                .on('error', error => log.error(error))
                .on('data', async (row) => {
                    dataArray.push(AirlineModel.fromArray(row));
                })
                .on('end', async () => {
                    if (dataArray.length > 0) await this.dao.save(dataArray);
                    stream.destroy();
                });
        } catch (e) {
            log.error(e.message);
            return Promise.reject(e);
        }    }

    async list() {
        try {
            return await this.dao.list();
        } catch(err) {
            log.error('Error fetching list', err);
            return Promise.reject(err);
        }
    }
 
}