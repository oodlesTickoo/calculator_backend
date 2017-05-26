var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function() {
    router.post('/api/v1/web-shot', configurationHolder.security.authority("ANONYMOUS"), CalculatorController.webShot);
    router.post('/api/v1/pdf', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), CalculatorController.requestPdf);    
    router.get('/api/v1/data', configurationHolder.security.authority("ANONYMOUS"), CalculatorController.getData);
    router.post('/api/v1/data', configurationHolder.security.authority("ANONYMOUS"), CalculatorController.saveData);
    router.post('/api/v1/file', configurationHolder.security.authority("ANONYMOUS"), CalculatorController.saveAttachment);
};
