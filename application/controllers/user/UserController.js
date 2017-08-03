var UserService = require("../../services/user/UserService").UserService;

module.exports.UserController = (function() {

	function getClientList(req, res){
		var userId = req.params && req.params.userId? req.params.userId:null;
		UserService.getClientList(req.loggedInUser, userId, res);
	}

	function getAdvisorList(req, res){
		UserService.getAdvisorList(res);
	}
	return {
		getClientList:getClientList,
		getAdvisorList:getAdvisorList
	};
})();