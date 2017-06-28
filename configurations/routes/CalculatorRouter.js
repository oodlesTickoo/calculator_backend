var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function() {
    router.post('/api/v1/web-shot', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.webShot);
    router.post('/api/v1/pdf', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), CalculatorController.requestPdf);    
    router.get('/api/v1/data', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.getData);
    router.post('/api/v1/data', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.saveData);
    router.post('/api/v1/file', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.saveAttachment);
    router.get('/api/v1/file', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.getFile);
    router.get('/api/v1/checkFile', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.checkFile);
    router.post('/api/v1/upload', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.upload);
    router.put('/api/v1/client/link_advisor', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), CalculatorController.linkAdvisorToClient);

};
