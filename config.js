const config = {

    mongodb: {
        connection: process.env.MONGO_DB_URL || 'mongodb://admin:admin@localhost:27017/',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

}

module.exports = config;