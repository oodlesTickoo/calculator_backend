var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
var UserController = require("../../application/controllers/user/UserController.js").UserController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function() {

    router.get('/api/v1/user/:userId/clients', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADVISOR), UserController.getClientList);
    router.get('/api/v1/clients', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADMINISTRATOR), UserController.getClientList);
    router.get('/api/v1/advisors', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADMINISTRATOR), UserController.getAdvisorList);
    router.get('/api/v1/me', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), UserController.getMyProfile);
};