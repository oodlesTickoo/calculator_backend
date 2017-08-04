var UserService = require('../user/UserService').UserService;
var SmsService = require('../sms/SmsService.js').SmsService;
var HubspotService = require('../calculator/HubspotService.js').HubspotService;
var CalculatorService = require('../calculator/CalculatorService.js').CalculatorService;

var uuid = require('uuid/v1');

module.exports.AuthenticationService = (function() {

    /* generate authenticationToken and return it to the calling function
     * @payload  User's mobile
     * return authenticationToken
     */
    var _generateAuthenticationToken = function(mobile, role) {
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


    var logout = function(loggedInUser, authenticationToken, res) {
        domain.AuthenticationToken.remove({
            auth_token: authenticationToken,
            mobile: loggedInUser.mobile
        }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, "logout successfully", false, 200);
            }
        })
    };

    /* verify OTP
     * generate the authentiction token 
     */
    var authenticate = function(mobile, res) {
        UserService.searchUserByMobile(mobile)
            .then(user => {
                console.log("2222222222");
                if (user) {
                    console.log("2222222222444444444");
                    generateOtp({
                            mobile: mobile,
                            role: user.role
                        })
                        .then(result => configurationHolder.ResponseUtil.responseHandler(res, result, "OTP generated successfully", false, 200));
                } else {
                    console.log("11111111")
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
                    SmsService.send(doc.mobile, doc.otp, function(err, smsRes) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                id: doc._id,
                                mobile: doc.mobile
                            });
                        }
                    });
                }
            });
        });
    };

    var _deleteOtp = function(id) {
        return new Promise(function(resolve, reject) {
            
            domain.Otp.remove({
                _id: id
            }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

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
                    var createUserReqObj = {
                        firstName: result.firstName,
                        lastName: result.lastName,
                        mobile: result.mobile,
                        role: result.role,
                        email: result.email
                    };

                    HubspotService.searchUser(result.mobile)
                        .then(hubspotUserObj => {
                            if (!hubspotUserObj.total) {
                                if(createUserReqObj.role ==="CLIENT"){
                                    createUserReqObj.lifecyclestage= "customer";
                                }                                
                                return HubspotService.createUser(createUserReqObj);
                            } else {
                                return Promise.resolve({
                                    vid: hubspotUserObj.contacts[0].vid
                                });
                            }
                        })
                        .then(hubspotResult => {
                            if (hubspotResult.status != 'error') {
                                delete createUserReqObj.lifecyclestage;
                                createUserReqObj.hubspotUserId = hubspotResult.vid;
                                return UserService.createUser(createUserReqObj);
                            } else {
                                throw new error(hubspotResult);
                            }
                        })
                        .then(userObj => CalculatorService._saveFactfindData(null,userObj))
                        .then(factFindObj => _deleteOtp(id))
                        .then(deletedObj => _generateAuthenticationToken(result.mobile, result.role))
                        .then(authObj => configurationHolder.ResponseUtil.responseHandler(res, authObj, "Login successfully", false, 200))
                        .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                } else {
                    _deleteOtp(id)
                        .then(deletedObj => _generateAuthenticationToken(result.mobile, result.role))
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
                SmsService.send(result.mobile, result.otp, function(err, smsRes) {
                    if (err) {
                        configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, {
                            id: result._id,mobile: result.mobile
                        }, "OTP sent successfully", false, 200);
                    }
                });
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, "Mobile number not found", true, 401);
            }
        });
    };

    

    //return the method which you want to be public
    return {
        authenticate: authenticate,
        verifyOtp: verifyOtp,
        generateOtp: generateOtp,
        resendOtp: resendOtp,
        logout: logout
    };

})();