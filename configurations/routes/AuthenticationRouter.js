var AuthenticationController = require("../../application/controllers/common/AuthenticationController.js").AuthenticationController;
const Constants = require('./../../application-utilities/Constants');
module.exports.routePath = function() {
    router.post('/api/v1/adminLogin', AuthenticationController.adminLoginAction);
    router.post('/api/v1/login', AuthenticationController.loginAction);
    router.post('/api/v1/logout',configurationHolder.security.authority(Constants.ROUTE_ACCESS_ROLE.CLIENT), AuthenticationController.logoutAction);
    router.post('/api/v1/verify', AuthenticationController.verifyOtp);
    router.post('/api/v1/resend', AuthenticationController.resendOtp);

    router.post('/api/v1/verify', AuthenticationController.verifyAuthToken);
};