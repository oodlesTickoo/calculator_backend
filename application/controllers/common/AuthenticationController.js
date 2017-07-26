var AuthenticationService = require("../../services/common/AuthenticationService").AuthenticationService;


module.exports.AuthenticationController = (function() {

    /*
     *  This method allow user to login
     *  call authenticate function of AuthenticationService
     *  generate authentication token for the end user and return the token
     */
    var loginAction = function(req, res) {
        AuthenticationService.authenticate(req.body.mobile, res);
    };

    var logoutAction = function(req, res) {
        console.log("logout action");
    };

    var verifyOtp = function(req, res) {
        AuthenticationService.verifyOtp(req.body.id, req.body.otp, res);
    };

    var resendOtp = function(req, res){
      AuthenticationService.resendOtp(req.body.mobile, res);
    }

    //public methods are  return
    return {
        loginAction: loginAction,
        logoutAction: logoutAction,
        verifyOtp: verifyOtp,
        resendOtp:resendOtp
    };

})();