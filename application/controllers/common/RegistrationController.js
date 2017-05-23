var UserService = require("../../services/user/UserService").UserService;


module.exports.RegistrationController = (function () {
    
    var SUPERADMIN_ALLOWED_ROLES = ["ROLE_ADMIN","ROLE_USER","ROLE_ANONYMOUS"]
    var ADMIN_ALLOWED_ROLES = ["ROLE_USER","ROLE_ANONYMOUS"]
    var USER_ALLOWED_ROLES = ["ROLE_USER"]
    var ANONYMOUS_ALLOWED_ROLES = ["ROLE_USER"]
    
   /*
    * This function validate whether conditions meet before a user creation or not 
    * Condition like only superadmin can create User with Role Admin
    * SuperAdmin can update user details and user himself
    */
   var  authorizeUserRegistrationRequest = function(loggedInUser,role,res){
       var userRole = null
       
       if(loggedInUser){userRole = loggedInUser.role}
       CustomLogger.info("user role is  = "+userRole+ "   loggedinuser"+loggedInUser)
       switch(userRole){
               case "ROLE_SUPERADMIN":
                      return checkAuthorizationForCreatingUserWithRole(SUPERADMIN_ALLOWED_ROLES,role,res)
                      break;
               case "ROLE_ADMIN":
                      return checkAuthorizationForCreatingUserWithRole(ADMIN_ALLOWED_ROLES,role,res)
                      break;
               case "ROLE_USER":
                      return checkAuthorizationForCreatingUserWithRole(USER_ALLOWED_ROLES,role,res)
                      break;
               case "ROLE_ANONYMOUS":
                      return checkAuthorizationForCreatingUserWithRole(ANONYMOUS_ALLOWED_ROLES,role,res)
                      break;
               default :
                       if(role == "ROLE_USER"){
                           return true
                       }else{
                           configurationHolder.ResponseUtil.responseHandler(res,null,"Unauthorized User",true,401)
                       }
                       break;
       }
   }
   
   
    
   var checkAuthorizationForCreatingUserWithRole = function(allowed_roles,role,res){
    CustomLogger.info(allowed_roles)
    CustomLogger.info("role == "+role);
       if(allowed_roles.indexOf(role) == -1){
           configurationHolder.ResponseUtil.responseHandler(res,null,"Unauthorized User",true,401)
           
       }
       return true
   }


    var validatePassword = function(salt,password,password2,res){
        if(password == password2){
            var encryptedPassword = crypto.createHmac('sha1',salt).update(password).digest('hex')
            return encryptedPassword
        }
    }

   var registerUserAction =  function (req,res) {
         var userObject = req.body.user
         var addressObject = req.body.address
         var role = req.body.user.role
         var loggedInUser = req.loggedInUser
        userObject.salt = uuid.v1();
        var password = validatePassword(userObject.salt,userObject.password,userObject.password2,res)

        userObject.password = password
         var authorizationFlag = authorizeUserRegistrationRequest(loggedInUser,role,res)
         if(authorizationFlag = true){
            UserService.registrationUser(userObject,addressObject,res)
         }

    }
   

   var verifyUserAction = function (req,res) {
       
   }
   
   
   
   var resetPaswordAction = function (req,res) {
   }
   
   
   
   
   var updatePasswordAction = function (req,res) {
   }
   
   
   
  //public methods are  return
  return {
      registerUserAction: registerUserAction,
      verifyUserAction: verifyUserAction,
      resetPaswordAction : resetPaswordAction,
      updatePasswordAction : updatePasswordAction
  }
})();
