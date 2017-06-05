const FieldName = require('./../../../application-utilities/FieldName');
const Constants = require('./../../../application-utilities/Constants');
module.exports.HubspotService = (function() {
	var request = require('request');
	
	const ACCESS_KEY = 'hapikey',
		POST = 'post',
		GET = 'get',
		PUT = 'put';

	function _setHubspotContactObject(userObj){

		var properties = [];
		var keys = Object.keys(userObj);
		keys.forEach(function(key){
			switch(_objectType(userObj[key])){

				case 'String':{
					properties.push({
						'property': key.toLowerCase(),
						'value': userObj[key]
					})
					break;
				}
				case 'Object':{
					break;
				}
				case 'Array':{
					properties = properties.concat(createObjectFormArray(key, userObj[key]))
					break;
				}

			}
		})
		return properties;
	}


	function createObjectFormArray(key, arrayObj){
		var properties = [];
		var index = 0;
		var rejectedValue = ['CONTACT_FIELD_151','CONTACT_FIELD_152','CONTACT_FIELD_153']
		arrayObj.forEach(function(obj){
			switch(key){
				case 'CUSTOMFIELDS':{
					if(rejectedValue.indexOf(obj.CUSTOM_FIELD_ID) === -1){
						properties.push({
							'property': (FieldName[obj.CUSTOM_FIELD_ID]).toLowerCase() || obj.CUSTOM_FIELD_ID.toLowerCase(),
							'value': obj.FIELD_VALUE
						})
					}
					break;
				}
				case 'CONTACTINFOS':{
					properties.push({
						'property': obj.TYPE.toLowerCase(),
						'value': obj.DETAIL
					})
					break;
				}
				case 'ADDRESSES':{
					Object.keys(obj).forEach(function(addressKey){
						if(addressKey !== 'ADDRESS_ID'){
							properties.push({
								'property': (key_+''+index+'_'+addressKey).toLowerCase(),
								'value': obj[addressKey]
							})
						}
					})	
					break;
				}
				case 'DATES':{
					Object.keys(obj).forEach(function(dateKey){
						if(dateKey !== 'DATE_ID'){
							properties.push({
								'property': (key_+''+index+'_'+dateKey).toLowerCase(),
								'value': obj[dateKey]
							})
						}
					})	
					break;
				}
				case 'TAGS':{
					properties.push({
						'property': (key_+''+index).toLowerCase(),
						'value': obj.TAG_NAME
					})
					break;
				}
			}
			index++;
		})
		return properties;
	}

	function _objectType(object){
		return Object.prototype.toString.call(object).split(/\W/)[2];
	}

	function save(userObj){
		console.log("+++++++++++++++++++++++++++++")
		console.log(userObj);
		console.log("+++++++++++++++++++++++++++++")
		var url = Constants.HOBSPOT_URL.EMAIL_SEARCH + '?email='+ _getEmail(userObj) + '&' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
		_callToHubspot(GET, url, null).then(function(result){
			var contactUrl = Constants.HOBSPOT_URL.CONTACT;
			var data = _setHubspotContactObject(userObj);
			console.log('==============================');
			console.log(result);
			console.log('==============================');
			if(result && Object.keys(result).length > 0){
				contactUrl + 'vid/' + result[Object.keys(result)[0]].vid + '/profile';
			}
			console.log('_________________________');
			console.log(data);
			console.log('__________________________');
			contactUrl = contactUrl + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
			_callToHubspot(POST, contactUrl, {'properties': data});
		});
	}

	function _getEmail(userObj){
		var email = '';
		userObj.CONTACTINFOS.forEach(function(info){
			if(info.TYPE === 'EMAIL'){
				email = info.DETAIL;
			}
		})
		return email;
	}

	function _callToHubspot(method, urlPath, data){
		var options = {
            url: configurationHolder.config.hubspot.url + urlPath,
            method: method,
            data: data
        };
        console.log('#################################');
        console.log(options);
        console.log('#################################');
        return new Promise(function(resolve, reject){
        	request(options, function(error, response, body) {
        	    if (error) {
        	    	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>',error)
    	            reject(error);
	            } else {
	            	console.log('RESULT ', body);
                	body = JSON.parse(body);
                	resolve(body);
            	}
			})
        })
    }

	return {
		save:save
	}

})();