var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function () {
	
       router.get('/api/v1/master_client',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getMasterClientList)
       router.get('/api/v1/master_advisor',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getMasterAdvisorList)
       router.get('/api/v1/assigned_client',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS),CalculatorController.getAssignedClientList)
       router.put('/api/v1/custom_field',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT),CalculatorController.customFieldUpdate)
       
}