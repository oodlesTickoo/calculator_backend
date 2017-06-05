const FieldName = require('./../../../application-utilities/FieldName');
module.exports.AuthService = (function() {

	function generateAuthToken(userObj){
		return new Promise(function(resolve, reject){
			var authObj = {
				role: _getUserRoleFromUserObject(userObj),
				contact_id: userObj.CONTACT_ID,
				first_name:userObj.FIRST_NAME,
				last_name:userObj.LAST_NAME,
				email: _getEmailUserObject,
				auth_token:uuid.v1()
			};
			var auth = new domain.AuthenticationToken(authObj);
			auth.save(function(err, result){
				if(err){
					reject(err);
				} else{
					resolve(result);
				}
			})
		})	
	}

	function _getUserRoleFromUserObject(userObj){
		var role = '';
		for(var i=0; i < userObj.CUSTOMFIELDS.length; i++){
			if(userObj.CUSTOMFIELDS[i].CUSTOM_FIELD_ID === FieldName.USER_TYPE){
				role = userObj.CUSTOMFIELDS[i].FIELD_VALUE;
				break;
			}
		}
		return role;
	}

	function _getEmailUserObject(userObj){
		var email = '';
		for(var i=0; i < userObj.CONTACTINFOS.length; i++){
			if(userObj.CONTACTINFOS[i].TYPE.toLowerCase() === 'email'){
				email = userObj.CONTACTINFOS[i].DETAIL;
				break;
			}
		}
		return email;
	}

	return {
		generateAuthToken: generateAuthToken
	}

})();