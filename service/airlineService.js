const csv = require('fast-csv');
const https = require('https');
const fs = require('fs');
const log = require('../lib/log');
const path = require('path');
const AirlineModel = require('../model/airlineModel');

module.exports = class AirlineService {

    async load () {
        await this.download(this.parseFile);
        
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
        let dataArray = [];

        let stream = await fs.createReadStream('/tmp/airlines.dat') 
            .pipe(csv.parse())
            .on('error', error => log.error(error))
            .on('data', (row) => {
                dataArray.push(AirlineModel.fromArray(row));
            })
            .on('end', rowCount => log.info(`Parsed ${rowCount} rows`));
        
        log.debug(dataArray);
    }

}