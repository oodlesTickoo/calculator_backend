var CalculatorService = require("../../services/calculator/CalculatorService").CalculatorService;
var FileService = require("../../services/calculator/FileService").FileService;


module.exports.CalculatorController = (function() {

    var webShot = function(req, res) {
        CalculatorService.webShot(req.query.type, req.body, res);
    };

    var requestPdf = function(req, res) {
        CalculatorService.requestPdf(req.body, req.loggedInUser, res);
    };

    var login = function(req, res) {
        CalculatorService.login(req.body, res);
    };

    var getData = function(req, res) {
        CalculatorService.getData(req.body, res);
    };

    var saveData = function(req, res) {
        CalculatorService.saveData(req.body, res);
    };

    var saveAttachment = function(req, res) {
        CalculatorService.saveAttachment(req.body, res);
    };

    var getAssignedClientList = function(req, res) {
        CalculatorService.getAssignedClientList(req.body, res);
    };

    var getMasterClientList = function(req, res) {
        CalculatorService.getMasterClientList(res);
    };

    var getMasterAdvisorList = function(req, res) {
        CalculatorService.getMasterAdvisorList(res);
    };
    var getFile = function(req, res) {
        FileService.get(res, Number(req.query.contact_id), req.query.file_format);
    };

    var upload = function(req, res) {
        FileService.upload(req.files.file, req.query.contact_id, res);
    };

    //public methods are  return
    return {
        webShot: webShot,
        requestPdf: requestPdf,
        login: login,
        getData: getData,
        saveData: saveData,
        saveAttachment: saveAttachment,
        getAssignedClientList:getAssignedClientList,
        getMasterClientList:getMasterClientList,
        getMasterAdvisorList:getMasterAdvisorList,
        getFile: getFile,
        upload: upload
    };

})();