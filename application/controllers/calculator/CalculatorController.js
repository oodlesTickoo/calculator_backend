var CalculatorService = require("../../services/calculator/CalculatorService").CalculatorService;
var FileService = require("../../services/calculator/FileService").FileService;
var UserService = require("../../services/user/UserService").UserService;

module.exports.CalculatorController = (function() {

    var webShot = function(req, res) {
        CalculatorService.webShot(req.query.type, req.body, res);
    };
    var saveFactfindDataAndGeneratePdf = function(req, res) {
        CalculatorService.saveFactfindDataAndGeneratePdf(req.body, req.loggedInUser, res);
    };
    var getFactfindData = function(req, res) {
        CalculatorService.getFactfindData(req.loggedInUser, res);
    };
    var getUserFile = function(req, res) {
        FileService.getUserFile(req.loggedInUser, req.params.userId, req.params.fileType, res);
    };
    var upload = function(req, res) {
        FileService.upload(req.files.advisor_soa, req.params.userId, res);
    };
    var linkAdvisorToClient = function(req, res) {
        CalculatorService.linkAdvisorToClient(req.body.clientId, req.body.advisorId, res);
    };

    //public methods are  return
    return {
        webShot: webShot,
        saveFactfindDataAndGeneratePdf: saveFactfindDataAndGeneratePdf,
        getUserFile: getUserFile,
        upload: upload,
        linkAdvisorToClient: linkAdvisorToClient,
        getFactfindData: getFactfindData
    };
})();