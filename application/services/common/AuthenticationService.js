var UserService = require('../user/UserService').UserService;
var SmsService = require('../sms/SmsService.js').SmsService;
var HubspotService = require('../calculator/HubspotService.js').HubspotService;
var uuid = require('uuid/v1');

module.exports.AuthenticationService = (function() {

    /* generate authenticationToken and return it to the calling function
     * @payload  User's mobile
     * return authenticationToken
     */
    var generateAuthenticationToken = function(mobile, role) {
        return new Promise(function(resolve, reject) {
            var authenticationObj = new domain.AuthenticationToken({
                auth_token: uuid(),
                mobile: mobile,
                role: role
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
        UserService.searchUserByMobile(mobile)
            .then(user => {
                if (user) {
                    generateOtp({
                            mobile: mobile
                        })
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

            //generate random 4 digit OTP number
            userObj.otp = Math.floor(1000 + Math.random() * 9000);

            var otpObj = new domain.Otp(userObj);
            otpObj.save(function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    //TODO: check callback parameter
                    console.log("doc", doc);
                    SmsService.send(doc.mobile, doc.otp, function(err, smsRes) {
                        console.log("smsRes", smsRes);
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                id: doc._id
                            });
                        }
                    });
                }
            });
        });
    };

    // this function will verify OTP, it will create a new user 
    // and generate the authentication token to maintain session

    var verifyOtp = function(id, otp, res) {
        domain.Otp.findOne({
            _id: id,
            otp: otp
        }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else if (result) {
                if (result.isNewUser) {
                    delete result.isNewUser;
                    delete result.otp;
                    HubspotService.searchUser(result.mobile)
                        .then(hubspotUserObj => {
                            if (!hubspotUserObj.total) {
                                var hubspotUserReqObj = {
                                    firstName: result.firstName,
                                    lastName: result.lastName,
                                    mobile: result.mobile,
                                    role: result.role,
                                    email: result.email
                                };

                                HubspotService.createUser(hubspotUserReqObj)
                                    .then(hubspotResult => {
                                        console.log("hubspotResult", hubspotResult);
                                        if (!err && hubspotResult.status != 'error') {
                                            result.hubspotUserId = hubspotResult.vid;
                                            /**
                                             * Save user in DB
                                             */
                                            UserService.createUser(result)
                                                .then(userObj => {
                                                    generateAuthenticationToken(result.mobile, result.role)
                                                        .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200))
                                                        .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                                                })
                                                .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                                        } else {
                                            configurationHolder.ResponseUtil.responseHandler(res, err || hubspotResult, err.message || hubspotResult.message, true, 400);
                                        }
                                    })
                                    .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));;
                            } /*else {
                                result.hubspotUserId = '';
                                UserService.createUser(result)
                                    .then(userObj => {
                                        generateAuthenticationToken(result.mobile, result.role)
                                            .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200))
                                            .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                                    })
                                    .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                            }*/
                        })
                        .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                } else {
                    generateAuthenticationToken(result.mobile, result.role)
                        .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200))
                        .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                }
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, "invalid otp", true, 401);
            }
        });
    };

    var resendOtp = function(mobile, res) {
        domain.Otp.findOne({
            mobile: mobile
        }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else if (result) {
                sms.send(result.mobile, result.otp, function(err, smsRes) {
                    if (err) {
                        configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, {
                            id: doc._id
                        }, "OTP sent successfully", false, 200);
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