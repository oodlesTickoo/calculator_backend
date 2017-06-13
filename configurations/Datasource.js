/**
 configuration is define to make connection with the database for the different environment.
*/

var getDbConnection = function() {
    var db, dbName, dbUser, dbPassword, dbHost, dbPort;

    switch (process.env.NODE_ENV) {
        case 'development':
            dbName = 'ttr', dbUser = 'admin', dbPassword = 'oodles', dbHost = 'localhost', dbPort = '27017';
            break;
        case 'staging':
            dbName = 'ttr', dbUser = 'admin', dbPassword = 'oodles', dbHost = 'localhost', dbPort = '27017';
            break;
        case 'production':
            dbName = 'ttr', dbUser = 'admin', dbPassword = 'oodles', dbHost = 'localhost', dbPort = '27017';
            break;
        case 'test':
            dbName = 'ttr', dbUser = 'admin', dbPassword = 'oodles', dbHost = 'localhost', dbPort = '27017';
            break;
    }

    db = mongoose.connect('mongodb://' + dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbName);
    checkMongooseConnection(db)
}

//function to check connection to database server
function checkMongooseConnection(db) {
    mongoose.connection.on('open', function(res) {
        CustomLogger.info('Connected to mongo server.');
    });
    mongoose.connection.on('error', function(err) {
        CustomLogger.error('Could not connect to mongo server!', err);
    });
}

module.exports.getDbConnection = getDbConnection;
