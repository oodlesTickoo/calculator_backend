var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function() {
    router.post('/api/v1/web-shot', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ANONYMOUS), CalculatorController.webShot);
    router.post('/api/v1/pdf', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), CalculatorController.requestPdf);    
    router.post('/api/v1/calculator/factfind', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), CalculatorController.saveFactfindData);
    router.get('/api/v1/user/:userId/file/:fileType', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADVISOR), CalculatorController.getUserFile);
    router.post('/api/v1/user/:userId/upload', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADVISOR), CalculatorController.upload);
    router.post('/api/v1/client/link_advisor', configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.ADMINISTRATOR), CalculatorController.linkAdvisorToClient);

};
