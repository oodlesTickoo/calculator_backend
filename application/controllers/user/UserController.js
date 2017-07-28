var UserService = require("../../services/user/UserService").UserService;

module.exports.UserController = (function() {
	function dataForHomePage(req, res){
		UserService.dataForHomePage(req.loggedInUser, res);
	}

	function getClientList(req, res){
		var userId = req.params && req.params.userId? req.params.userId:null;
		UserService.getClientList(req.loggedInUser, userId, res);
	}

	function getAdvisorList(req, res){
		UserService.getAdvisorList(req.loggedInUser, res);
	}
	return {
		dataForHomePage: dataForHomePage,
		getClientList:getClientList,
		getAdvisorList:getAdvisorList
	}
})();