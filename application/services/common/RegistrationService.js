var AuthenticationService =require('./AuthenticationService');

module.exports.RegistrationService = (function() {

    function registerUser(userObject, res) {
        AuthenticationService.generateOtp(userObject)
            .then(result => configurationHolder.ResponseUtil.responseHandler(res, result, "OTP generated successfully", false, 200))
            .catch(err => {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            });
    }

    //return the method which you want it to be public
    return {
        registerUser: registerUser
    };

})();