var UserService = require("../../services/user/UserService").UserService;

module.exports.UserController = (function() {

	function dataForHomePage(req, res){
		UserService.dataForHomePage(req.loggedInUser, res);
	}

	return {
		dataForHomePage: dataForHomePage
	}
})();