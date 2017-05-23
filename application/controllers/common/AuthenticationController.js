var AuthenticationService = require("../../services/common/AuthenticationService").AuthenticationService;


module.exports.AuthenticationController = (function () {
    
   /*
    *  This method allow user to login
    *  call authenticate function of AuthenticationService
    *  generate authentication token for the end user and return the token
    */
   var loginAction =  function (req,res) {
         AuthenticationService.authenticate(req.body.email,req.body.password,res) 
    }
   
   var logoutAction = function (req,res) {
        console.log("logout action")  
    }
   
  //public methods are  return
  return {
    loginAction: loginAction,
    logoutAction: logoutAction
  };

})();

