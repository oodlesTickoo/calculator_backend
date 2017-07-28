var AuthenticationController = require("../../application/controllers/common/AuthenticationController.js").AuthenticationController;
module.exports.routePath = function() {
    router.post('/api/v1/login', AuthenticationController.loginAction);
    router.post('/api/v1/logout', AuthenticationController.logoutAction);
    router.post('/api/v1/verify', AuthenticationController.verifyOtp);
    router.post('/api/v1/resend', AuthenticationController.resendOtp);
};