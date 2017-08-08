var AuthenticationService = require("../../services/common/AuthenticationService").AuthenticationService;
const Constants = require('./../../../application-utilities/Constants');

module.exports.AuthenticationController = (function() {

    // This function calls authenticate function when
    // user tries to login.

    var adminLoginAction = function(req, res) {
        AuthenticationService.adminAuthenticate(req.body.email,req.body.password, res);
    };

    var loginAction = function(req, res) {
        AuthenticationService.authenticate(req.body.mobile, res);
    };

    // This function calls authenticate function when
    // user tries to logout.

    var logoutAction = function(req, res) {
        AuthenticationService.logout(req.loggedInUser, req.get(Constants.AUTH_HEADER), res);
    };

    // This function calls verifyOtp function to verify
    // the otp entered by the user.

    var verifyOtp = function(req, res) {
        AuthenticationService.verifyOtp(req.body.id, req.body.otp, res);
    };

    // This function calls resendOtp function to resend
    // the otp to the user.

    var resendOtp = function(req, res){
      AuthenticationService.resendOtp(req.body.mobile, res);
    };

    //public methods returned.
    return {
        adminLoginAction: adminLoginAction,
        loginAction: loginAction,
        logoutAction: logoutAction,
        verifyOtp: verifyOtp,
        resendOtp:resendOtp
    };

})();