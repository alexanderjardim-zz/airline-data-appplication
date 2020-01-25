const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: 'airline-data-application',
    stream: process.stdout,
    level: process.env.LOG_LEVEL || 'debug'
});