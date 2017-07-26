var UserService = require('./../user/UserService');

module.exports.AuthenticationService = (function() {

    /* generate authenticationToken and return it to the calling function
     * @payload  User's mobile
     * return authenticationToken
     */
    var generateAuthenticationToken = function(mobile) {
        return new Promise(function(resolve, reject) {
            var authenticationObj = new domain.AuthenticationToken({
                mobile: mobile,
                authToken: uuid.v1()
            });
            authenticationObj.save(function(err, authObj) {
                if (err) {
                    reject(err);
                } else {
                    resolve(authObj);
                }
            });
        });
    };

    /* verify OTP
     * generate the authentiction token 
     */
    var authenticate = function(mobile, res) {
        userService.searchUserByMobile(mobile)
            .then(user => {
                if (user) {
                    generateOtp({ mobile: mobile })
                        .then(result => configurationHolder.ResponseUtil.responseHandler(res, result, "OTP generated successfully", false, 200));
                } else {
                    configurationHolder.ResponseUtil.responseHandler(res, null, "Mobile is not registered", true, 401);
                }
            })
            .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
    };

    /* generate an otp and send to a number by SMS  
     */
    var generateOtp = function(userObj) {
        return new Promise(function(resolve, reject) {
            var sms = require('../sms/SmsServie.js');
            //generate random 4 digit OTP number
            userObj.otp = Math.floor(1000 + Math.random() * 9000);

            var otpObj = new domain.Otp(userObj);
            otpObj.save(function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    //TODO: check callback parameter
                    sms.send(mobileNumber, otp, function(err, smsRes) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id: doc._id });
                        }
                    });
                }
            });
        });
    };

    // this function will verify OTP, it will create a new user 
    // and generate the authentication token to maintain session

    var verifyOtp = function(id, otp, res) {
        domain.Otp.findOne({ _id: id, otp: otp }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else if (result) {
                if (result.isNewUser) {
                    delete result.isNewUser;
                    delete result.otp;
                    UserService.createUser(result)
                        .then(userObj => {
                            generateAuthenticationToken(result.mobile)
                                .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200));
                        });
                } else {
                    generateAuthenticationToken(result.mobile)
                        .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200));
                }
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, "invalid otp", true, 401);
            }
        });
    };

    var resendOtp = function(mobile, res) {
        domain.Otp.findOne({ mobile: mobile }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else if (result) {
                sms.send(result.mobile, result.otp, function(err, smsRes) {
                    if (err) {
                        configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, { id: doc._id }, "OTP sent successfully", false, 200);
                    }
                });
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, "Mobile number not found", true, 401);
            }
        });
    };

    //return the method which you want it to be public
    return {
        authenticate: authenticate,
        verifyOtp: verifyOtp,
        generateOtp: generateOtp,
        resendOtp: resendOtp
    };

})();