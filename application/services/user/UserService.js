const Constants = require('./../../../application-utilities/Constants');
const HubspotService = require('./../calculator/HubspotService').HubspotService;
const AuthenticationService = require('../common/AuthenticationService');

module.exports.UserService = (function() {
    var request = require('request');

    var createUser = function(userObj, res) {
        return new Promise(function(resolve, reject) {
            user = new domain.User(userObj);
            user.save(function(err, createdUser) {
                if (!err && createdUser) {
                    resolve(createdUser);
                } else {
                    reject(err);
                }
            });
        });
    };

    function searchUserByMobile(mobile) {
        return new Promise(function(resolve, reject) {
            domain.User.findOne({
                'mobile': mobile
            }, function(err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    function updateUser(query, objToBeUpdated) {
        return new Promise(function(resolve, reject) {
            console.log("query", query);
            console.log("objToBeUpdated", objToBeUpdated);

            domain.User.update(query, { $set: objToBeUpdated }, function(err, result) {
                if (!err && result.nModified > 0) {
                    resolve(result);
                } else {
                    reject({
                        'message': err ? err : 'User not updated'
                    });
                }
                /*else {
                                   reject({
                                       'message': 'User not updated'
                                   });
                               }*/
            });
        });
    }

    function registerUser(userObject, res) {
        AuthenticationService.generateOtp(userObject)
            .then(result => configurationHolder.ResponseUtil.responseHandler(res, result, "OTP generated successfully", false, 200))
            .catch(err => {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            });
    }

    function getClientList(loggedInUser, userId, res) {
        var query = {};
        if ((loggedInUser.role == 'ADVISOR' || loggedInUser.role == 'ADMINISTRATOR') && userId) {
            query = {
                advisor: loggedInUser._id,
                role: 'CLIENT'
            };
        } else {
            query = {
                role: 'CLIENT'
            };
        }
        domain.User.find(query, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, result, "Client list successfully retrieved", false, 200)
            }
        });
    }

    function getAdvisorList(loggedInUser, res) {
        domain.User.find({
            role: 'ADVISOR'
        }, function(err, result) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, result, "Advisor list successfully retrieved", false, 200)
            }
        });
    }

    return {
        createUser: createUser,
        searchUserByMobile: searchUserByMobile,
        updateUser: updateUser,
        registerUser: registerUser,
        getClientList: getClientList,
        getAdvisorList: getAdvisorList
    };
})();