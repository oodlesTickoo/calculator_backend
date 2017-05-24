var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
module.exports.routePath = function () {
	
       router.get('/api/v1/master_client',configurationHolder.security.authority("anonymous"),CalculatorController.getMasterClientList)
       router.get('/api/v1/master_advisor',configurationHolder.security.authority("anonymous"),CalculatorController.getMasterAdvisorList)
       router.get('/api/v1/assigned_client',configurationHolder.security.authority("anonymous"),CalculatorController.getAssignedClientList)
       
}