module.exports.AuthenticationService = (function () {
   //private variables
     var encryptedPassword
   // private methods 
   
   /* method used to  encrypt string using sha1 method , accept value and salt
    * @payload  password (string) , salt (string)
    * return encryptedPassword (string)
    */
   var passwordEncryption = function(password,salt){
      CustomLogger.info("passwordEncryption == "+password+salt)
      encryptedPassword = crypto.createHmac('sha1',salt).update(password.toString()).digest('hex')
      return encryptedPassword 
   }

   /* method used to  match password enter by client after encrypting it to that of password saved in the database
    * @payload  User object  and password string
    * return boolean true if password matched  , else return false
    */
   var verifyPassword  = function(user,password){
        passwordEncryption(password,user.salt)
        var passwordVerificationResult = (user.password == encryptedPassword)?true:false
        return passwordVerificationResult
   }
   
   /* generate authenticationToken and return it to the calling function
    * @payload  User's email
    * return authenticationToken
    */
   var generateAuthenticationToken = function(user,email,res){
        var authenticationObj = new domain.AuthenticationToken({email:email,user:user._id,authToken:uuid.v1()})
        authenticationObj.save(function(err,authObj){
            if(err){
                 configurationHolder.ResponseUtil.responseHandler(res,null,"Unauthorized User",true,401)
            }else{
                 configurationHolder.ResponseUtil.responseHandler(res,authObj,null,false,200)
            }
        })
   }
   
   
   /* verify whether the user exist in the system or not
    * find the user by emai
    * match the password
    * generate the authentiction token 
    */
   var authenticate = function (email,password,res) {
         domain.User.findOne({email:email,accountLocked:false,isAccountActive:true},function(err,user){
            if(user && verifyPassword(user,password)){
                 generateAuthenticationToken(user,email,res)
             }else{
                 configurationHolder.ResponseUtil.responseHandler(res,null,"Unauthorized User",true,401)
             }
         })
  }
   
  //return the method which you want it to be public
  return {
     authenticate : authenticate
  };

})();