/*
 * This module is for the authorization process . Called as middleware function to decide whether user have enough authority to access the 
 *
 */
var async = require('async');
const Constants = require('./../application-utilities/Constants');

module.exports.AuthorizationMiddleware = (function() {
    /*
     *  Verify user is authorized to access the functionality or not
     */
    var verifyIsRoleInAccessLevel = function(next, results, res, req, accessLevel) {
        var roleInAccessLevel = Constants.ROUTE_ACCESS[accessLevel];
        var authorized = false;
        if (roleInAccessLevel.indexOf(results.authorizationTokenObject.role) > -1) {
            authorized = true;
            domain.User.findOne({ mobile: results.authorizationTokenObject.mobile }, function(err, userObj) {
                if (err) {
                    next(true, err);
                } else {
                    req.loggedInUser = userObj.toJSON();
                    next(null, authorized);
                }

            });
        } else {
            configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401);
        }
    };

    /*
     * find User and its role using authenticationToken. 
     */
    var findRoleByAuthToken = function(next, results, req, res, authToken) {
        domain.AuthenticationToken.findOne({
            auth_token: authToken
        }, function(err, authObj) {
            if (err || authObj === null) {
                configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401);
            } else {
                next(null, authObj);
            }
        });
    };

    /*
     *  call as middleware to decide the accessiblity of the function for the loggedIn user
     *  find user by AuthenticationToken
     *  Decide based on the role of user and accesslevel whether user is authorized or not 
     */
    var authority = function(accessLevel) {
        return function(req, res, next) {
            const authToken = req.get(Constants.AUTH_HEADER);

            console.log("authToken", authToken);
            console.log("accessLevel", accessLevel);
            if (accessLevel === Constants.ROUTE_ACCESS_ROLE.ANONYMOUS) {
                CustomLogger.info("executed in accesslevel ");
                req.loggedInUser = null;
                next();
            } else {
                async.auto({
                    authorizationTokenObject: function(next, results) {
                        findRoleByAuthToken(next, results, req, res, authToken);
                    },
                    isRoleInAccessLevel: ['authorizationTokenObject', function(next, results) {
                        verifyIsRoleInAccessLevel(next, results, res, req, accessLevel);
                    }]
                }, function(err, results) {
                    if (results.isRoleInAccessLevel) {
                        next();
                    } else {
                        configurationHolder.ResponseUtil.responseHandler(res, null, configurationHolder.errorMessage.failedAuthorization, true, 401);
                    }
                });
            }
        };
    };

    //public methods are  return
    return {
        authority: authority
    };
})();