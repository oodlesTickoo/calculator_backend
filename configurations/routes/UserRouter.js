var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
var UserController = require("../../application/controllers/user/UserController.js").UserController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function () {
	
       router.get('/api/v1/master_client',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getMasterClientList)
       router.get('/api/v1/master_advisor',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getMasterAdvisorList)
       router.get('/api/v1/assigned_client',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getAssignedClientList)
       router.put('/api/v1/custom_field',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT),CalculatorController.customFieldUpdate);
       router.get('/api/v1/home_data',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADVISOR),UserController.dataForHomePage)
       
}