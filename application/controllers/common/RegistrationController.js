var UserService = require("../../services/user/UserService").UserService;
var RegistrationService = require("../../services/common/RegistrationService");

var async = require('async');

module.exports.RegistrationController = (function() {

    var SUPERADMIN_ALLOWED_ROLES = ["ROLE_ADMIN", "ROLE_USER", "ROLE_ANONYMOUS"]
    var ADMIN_ALLOWED_ROLES = ["ROLE_USER", "ROLE_ANONYMOUS"]
    var USER_ALLOWED_ROLES = ["ROLE_USER"]
    var ANONYMOUS_ALLOWED_ROLES = ["ROLE_USER"]

    /*
     * This function validate whether conditions meet before a user creation or not 
     * Condition like only superadmin can create User with Role Admin
     * SuperAdmin can update user details and user himself
     */
    var authorizeUserRegistrationRequest = function(loggedInUser, role, res) {
        var userRole = null

        if (loggedInUser) {
            userRole = loggedInUser.role
        };
        switch (userRole) {
            case "ROLE_SUPERADMIN":
                return checkAuthorizationForCreatingUserWithRole(SUPERADMIN_ALLOWED_ROLES, role, res)
                break;
            case "ROLE_ADMIN":
                return checkAuthorizationForCreatingUserWithRole(ADMIN_ALLOWED_ROLES, role, res)
                break;
            case "ROLE_USER":
                return checkAuthorizationForCreatingUserWithRole(USER_ALLOWED_ROLES, role, res)
                break;
            case "ROLE_ANONYMOUS":
                return checkAuthorizationForCreatingUserWithRole(ANONYMOUS_ALLOWED_ROLES, role, res)
                break;
            default:
                if (role == "ROLE_USER") {
                    return true
                } else {
                    configurationHolder.ResponseUtil.responseHandler(res, null, "Unauthorized User", true, 401)
                }
                break;
        }
    }



    var checkAuthorizationForCreatingUserWithRole = function(allowed_roles, role, res) {
        if (allowed_roles.indexOf(role) == -1) {
            configurationHolder.ResponseUtil.responseHandler(res, null, "Unauthorized User", true, 401)
        }
    }

    var registerUserAction = function(req, res) {
        var loggedInUser = req.loggedInUser,
            userObject = {};

        userObject.firstName = req.body.firstName;
        userObject.lastName = req.body.lastName;
        userObject.role = req.body.role;
        userObject.email = req.body.email;
        userObject.mobile = req.body.mobile;
        userObject.isNewUser = true;

        var authorizationFlag = authorizeUserRegistrationRequest(loggedInUser, role, res)
        if (authorizationFlag) {
            RegistrationService.registerUser(userObject, res)
        }
    }

    //public methods are  return
    return {
        registerUserAction: registerUserAction
    }
})();