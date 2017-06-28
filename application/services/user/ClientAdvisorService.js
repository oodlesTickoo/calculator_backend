const FieldName = require('./../../../application-utilities/FieldName');
const Constants = require('./../../../application-utilities/Constants');
var CalculatorService = require('./../calculator/CalculatorService').CalculatorService;
var UserService = require('./UserService').UserService;

module.exports.ClientAdvisorService = (function() {

	function clientAdvisor(clientId, advisorId){
		
		return new Promise(function(resolve, reject){
			clientId = Number(clientId+'');
			advisorId = Number(advisorId+'');
			var promises = [];
			promises.push(_getUserByContactId(clientId));
			promises.push(_getUserByContactId(advisorId));
			Promise.all(promises).then(function(results){
				var client = results[0];
				var advisor = results[1];
				if(client && advisor){
					var obj = {client: client, advisor: advisor};
					domain.ClientAdvisor.findOneAndUpdate(
						{'client.CONTACT_ID': clientId},
						obj,
						{upsert: true}
					, function(err, clientAdvisorObj){
						if(err){
							reject(err);
						} else{
							resolve(clientAdvisorObj);
						}
					})
				} else{
					resolve();
				}			
			}).catch(function(err){
				reject(err);
			})
		})	
	}

	function _getUserByContactId(CONTACT_ID) {
    	return new Promise(function(resolve, reject) {
        	domain.User.findOne({
            	CONTACT_ID: CONTACT_ID
        	}, {
            	CONTACT_ID: 1,
           	 	FIRST_NAME: 1,
            	LAST_NAME: 1,
            	_id:0
        	}, function(err, result) {
        		console.log("RESULT ", result)
            	if (err || !result) {
                	reject(err);
            	} else {
                	resolve(result);
            	}
        	})
    	})
	}

	function createClientAdvisor(user, callback){
		var role = _getUserRoleFromUserObject(user);
		if(role === Constants.USER_ROLE.CLIENT){
			var advisorId = _getUserAdvisorId(user);
			if(advisorId){
				clientAdvisor(user.CONTACT_ID, advisorId).then(function(resu){
					callback();
				}).catch(function(err){
					callback();
				});
			} 
			else
				callback();
		}
		else
			callback();
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

	function _getUserAdvisorId(userObj){
		var CONTACT_ID = '';
		for(var i=0; i < userObj.CUSTOMFIELDS.length; i++){
			if(userObj.CUSTOMFIELDS[i].CUSTOM_FIELD_ID === FieldName.ADVISOR_ID){
				CONTACT_ID = userObj.CUSTOMFIELDS[i].FIELD_VALUE;
				break;
			}
		}
		return CONTACT_ID;
	}

	function list() {
		return new Promise(function(resolve, reject){
			domain.ClientAdvisor.find({}, function(err, data){
				var ids = data.map(function(e){
					return e.client.CONTACT_ID;
				})
				var query = {
					'$match': {
						'CONTACT_ID': {
							'$nin': ids
						},
						'CUSTOMFIELDS': {
                    		'$elemMatch': {
                        		'CUSTOM_FIELD_ID': FieldName.USER_TYPE,
                        		'FIELD_VALUE': Constants.USER_ROLE.CLIENT
                    		}
                		}
					}
				}
				var group = {
					'$group' : {
						'_id':null,
						clients: {
							'$push': {
								client:{
									CONTACT_ID: '$CONTACT_ID',
									FIRST_NAME: '$FIRST_NAME',
									LAST_NAME: '$LAST_NAME'
								}
							}
						}
					}
				}

				domain.User.aggregate([query, group], function(err, result){
					var resultData = (result && result[0] && result[0].clients)? data.concat(result[0].clients):data;
					resolve(resultData);
				})
			})
		})
	}

	function groupByAdvisor() {
		return new Promise(function(resolve, reject){
			var project = {
				'$project': {
					'advisorObj': {
						'CONTACT_ID': '$advisor.CONTACT_ID',
						'FIRST_NAME': '$advisor.FIRST_NAME',
						'LAST_NAME': '$advisor.LAST_NAME'
					},
					'clientObj': {
						'CONTACT_ID': '$client.CONTACT_ID',
						'FIRST_NAME': '$client.FIRST_NAME',
						'LAST_NAME': '$client.LAST_NAME'
					}
				}
			}
			var group = {
				'$group': {
					'_id': '$advisorObj',
					'clients': {'$push':'$clientObj'} 
				}
			}
			domain.ClientAdvisor.aggregate([project, group], function(err, data){
				resolve(data);
			})
		})
	}

	function setAdvisorToClientObject(userObj, advisorId){
		var flag = false;
		for(var i=0; i < userObj.CUSTOMFIELDS.length; i++){
			if(userObj.CUSTOMFIELDS[i].CUSTOM_FIELD_ID === FieldName.ADVISOR_ID){
				flag = true;
				userObj.CUSTOMFIELDS[i].FIELD_VALUE = advisorId;
				break;
			}
		}
		if(flag === false){
			userObj.CUSTOMFIELDS.push({
				CUSTOM_FIELD_ID: FieldName.ADVISOR_ID,
				FIELD_VALUE: advisorId
			});
		}
		return userObj;
	}

	return {
		clientAdvisor: clientAdvisor,
		createClientAdvisor: createClientAdvisor,
		groupByAdvisor: groupByAdvisor,
		list: list,
		setAdvisorToClientObject: setAdvisorToClientObject
	}

})();