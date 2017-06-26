var CalculatorService = require("../../services/calculator/CalculatorService").CalculatorService;
var FileService = require("../../services/calculator/FileService").FileService;
var ClientAdvisorService = require("../../services/user/ClientAdvisorService").ClientAdvisorService;
var UserService = require("../../services/user/UserService").UserService;

module.exports.CalculatorController = (function() {

    var webShot = function(req, res) {
        CalculatorService.webShot(req.query.type, req.body, res);
    };

    var requestPdf = function(req, res) {
         CalculatorService.requestPdf(req.body, req.loggedInUser, res);
          console.log('initiallllllllll',req.body);
          console.log('initiallllllllll111111111',req.body.iaObj);

        //CalculatorService.requestPdf(req.body, res);
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
    var linkAdvisorToClient = function(req, res) {
        CalculatorService.linkAdvisorToClient(Number(req.body.client_id), Number(req.body.advisor_id), res);
    };

    var customFieldUpdate = function(req, res) {
        UserService.customFieldUpdate(req.loggedInUser.CONTACT_ID, req.body.custom_field, res);

    };

    var isFileExists = function(req, res) {
        FileService.isfileExists(req.loggedInUser.CONTACT_ID, req.query.format, res);
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
        upload: upload,
        linkAdvisorToClient: linkAdvisorToClient,
        customFieldUpdate: customFieldUpdate,
        isFileExists: isFileExists
    };

})();
