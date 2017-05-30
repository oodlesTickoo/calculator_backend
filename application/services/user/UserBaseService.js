module.exports.UserService = (function () {


   var createUser =  function (next,results,userObject,addressObject,res) {


       var newUser = new domain.User(userObject)
       newUser.save(function(err,createdUserObj) {
           if (err){
               configurationHolder.ResponseUtil.responseHandler(res,err,err.message,true,400)
           }
            else{
               next(null,createdUserObj)
           }

       });

    }

    /* generate registrationToken and return it to the calling function
     * @payload  User's email
     * return registrationToken
     */
    var generateRegistrationToken = function(next,results,res){
        var registrationObj = new domain.RegistrationToken({email:results.saveUser.email,user:results.saveUser._id,registrationToken:uuid.v1()})
        registrationObj.save(function(err,registrationObj){
            if(err){
                configurationHolder.ResponseUtil.responseHandler(res,null,"Unauthorized User",true,401)
            }else{
                next(null,registrationObj);
            }
        })
    }

    var emailSendToUser = function(next,results,res){

        configurationHolder.EmailUtil.email("",results.saveUser.email,"dddd",results.generateRegistrationToken.registrationToken);
        next(null,"email sent");
    }

    var registrationUser =  function (userObject,addressObject,res) {
        async.auto({
            saveUser:function (next, results) {
                return createUser(next,results, userObject, addressObject, res);
            },
            generateRegistrationToken:['saveUser', function (next, results) {
                generateRegistrationToken(next, results,res)
            }],
            isEmailSend:['generateRegistrationToken', function (next, results) {
                emailSendToUser(next, results,res);
            }]
        },function(err,results) {
            if(err){
                configurationHolder.ResponseUtil.responseHandler(res,err,err.message,true,400)
            }else{
                configurationHolder.ResponseUtil.responseHandler(res,results,"User Created Successfully",false,200)
            }

        });
    }
   

   var verifyUser = function (req,res) {
       
   }
   
   var resetPasword = function (req,res) {
   }
   
   
   var updatePassword = function (req,res) {
   }
   
  //public methods are  return
  return {
      registrationUser: registrationUser,
      //verifyUserAction: verifyUserAction,
      //resetPaswordAction : resetPaswordAction,
      //updatePasswordAction : updatePasswordAction
  }
})();
