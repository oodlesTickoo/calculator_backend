/**
 * Module dependencies.
 */

global.configurationHolder = require('./configurations/DependencyInclude.js');

global.app = module.exports = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(errorHandler());

global.router = express.Router();
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

app.use("/download", express.static(__dirname + '/uploads'));


global.route = require('./configurations/routes');
global.domain = require('./configurations/DomainInclude.js');

app.use('/', router);

configurationHolder.Bootstrap.initApp();
