var UserService = require("../../services/user/UserService").UserService;

module.exports.UserController = (function() {

	function getClientList(req, res){
		var userId = req.params && req.params.userId? req.params.userId:null;
		UserService.getClientList(req.loggedInUser, userId, res);
	}

	function getAdvisorList(req, res){
		UserService.getAdvisorList(req.loggedInUser,res);
	}

	function getMyProfile(req, res){
		UserService.getMyProfile(req.loggedInUser, res);
	}
	return {
		getClientList:getClientList,
		getAdvisorList:getAdvisorList,
		getMyProfile:getMyProfile
	};
})();