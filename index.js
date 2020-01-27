const restify = require('restify');
const paginate = require('restify-paginate');
const log = require('./lib/log');
const AirlineController = require('./controller/airlineController');

function health(req, res, next) {
    res.send('ok');
    return next();
}

async function start() {
    try {
        let server = restify.createServer({
            name: 'airline-data',
            log: log,
            formatters: {
                'application/json': function (req, res, body) {
                    return JSON.stringify(body, null, '\t');
                }
            }
        });

        let controller = await AirlineController.create();
        server.pre(restify.plugins.pre.sanitizePath());

        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(paginate(server));

        server.get('/airlines', controller.list);
        server.get('/', health);

        server.listen(8080, () => {
            log.info('%s listening at %s', server.name, server.url);
        });
    } catch (err) {
        log.error(err);
        Promise.resolve();
    }
}

start();