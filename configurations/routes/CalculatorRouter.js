var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
module.exports.routePath = function() {
    router.post('/api/v1/web-shot', configurationHolder.security.authority("anonymous"), CalculatorController.webShot);
    router.post('/api/v1/pdf', configurationHolder.security.authority("anonymous"), CalculatorController.requestPdf);    
    router.get('/api/v1/data', configurationHolder.security.authority("anonymous"), CalculatorController.getData);
    router.post('/api/v1/data', configurationHolder.security.authority("anonymous"), CalculatorController.saveData);
    router.post('/api/v1/file', configurationHolder.security.authority("anonymous"), CalculatorController.saveAttachment);
};
