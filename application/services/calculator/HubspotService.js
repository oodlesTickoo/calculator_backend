const FieldName = require('../../../application-utilities/FieldName'),
	hubspotUserFields = require('../../../application-utilities/HubspotUserFields'),
    Constants = require('../../../application-utilities/Constants'),
    hubspotFactFindFields = require('../../../application-utilities/HubspotFactFindFields');

module.exports.HubspotService = (function() {
    var request = require('request');
    var fs = require('fs');

    const ACCESS_KEY = 'hapikey',
        POST = 'post',
        GET = 'get',
        PUT = 'put';

    function _setHubspotContactObject(userObj) {
        var properties = [];
        var keys = Object.keys(userObj);
        keys.forEach(function(key) {
            switch (_objectType(userObj[key])) {

                case 'String':
                    {
                        properties.push({
                            'property': (key.toLowerCase() === 'first_name') ? 'firstname' : (key.toLowerCase() === 'last_name') ? 'lastname' : key.toLowerCase(),
                            'value': userObj[key]
                        });
                        break;
                    }
                case 'Object':
                    {
                        break;
                    }
                case 'Array':
                    {
                        properties = properties.concat(createObjectFormArray(key, userObj[key]));
                        break;
                    }

            }
        });
        return properties;
    }


    function createObjectFormArray(key, arrayObj) {
        var properties = [];
        var index = 0;
        var rejectedValue = ['CONTACT_FIELD_151', 'CONTACT_FIELD_152', 'CONTACT_FIELD_153'];
        arrayObj.forEach(function(obj) {
            console.log('obj.CUSTOM_FIELD_ID ::  ', obj.CUSTOM_FIELD_ID, Fields[obj.CUSTOM_FIELD_ID], Fields.CONTACT_FIELD_150);
            switch (key) {
                case 'CUSTOMFIELDS':
                    {
                        if (rejectedValue.indexOf(obj.CUSTOM_FIELD_ID) === -1) {
                            properties.push({
                                'property': Fields[obj.CUSTOM_FIELD_ID],
                                'value': obj.FIELD_VALUE
                            });
                        }
                        break;
                    }
                case 'CONTACTINFOS':
                    {
                        properties.push({
                            'property': obj.TYPE.toLowerCase(),
                            'value': obj.DETAIL
                        });
                        break;
                    }
                    /*case 'ADDRESSES':{
                    	Object.keys(obj).forEach(function(addressKey){
                    		if(addressKey !== 'ADDRESS_ID'){
                    			properties.push({
                    				'property': (key_+''+index+'_'+addressKey).toLowerCase(),
                    				'value': obj[addressKey]
                    			})
                    		}
                    	})	
                    	break;
                    }*/
                    /*
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
                    				}*/
                    /*
                    				case 'TAGS':{
                    					properties.push({
                    						'property': (key_+''+index).toLowerCase(),
                    						'value': obj.TAG_NAME
                    					})
                    					break;
                    				}*/
            }
            index++;
        });
        return properties;
    }

    function _convertToHubspotPostData(fields, obj) {
        var convertedObj = {}
        convertedObj.properties = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                convertedObj.properties.push({
                    'property': fields[key],
                    'value': obj[key]
                });
            }
        }
        return convertedObj;
    }

    function _objectType(object) {
        return Object.prototype.toString.call(object).split(/\W/)[2];
    }

    function createUser(userObj) {
        var data = _convertToHubspotPostData(hubspotUserFields,userObj);
        console.log("sssssssssssssssssssssssssssssssssssss", data);
        return new Promise(function(resolve, reject) {
            var url = Constants.HUBSPOT_URL.CONTACT + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(POST, url, data)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    function searchUser(mobile) {
        return new Promise(function(resolve, reject) {
            var url = Constants.HUBSPOT_URL.QUERY_SEARCH + '?q=' + mobile + '&' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(GET, url, null)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    function updateUser(data, hubspotUserId) {
        return new Promise(function(resolve, reject) {
            var properties = {
                'properties': _convertToHubspotPostData(hubspotFactFindFields, data)
            };
            var contactUrl = Constants.HUBSPOT_URL.CONTACT + 'vid/' + hubspotUserId + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(POST, contactUrl, data)
                .then(updatedObj => resolve(updatedObj))
                .catch(err => reject(err));
        });
    }

    function updateAdvisor(clientId, advisorId) {
        return new Promise(function(resolve, reject) {
            var pro = {
                'properties': [{
                    'property': Fields.CONTACT_FIELD_151,
                    'value': advisorId
                }]
            };

            var contactUrl = Constants.HUBSPOT_URL.CONTACT + 'vid/' + hubspotUserId + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(POST, contactUrl, data)
                .then(updatedObj => resolve(updatedObj))
                .catch(err => reject(err));
        });
    }

    function uploadByOtherUser(filePath, contactId) {
        domain.User.findOne({
            CONTACT_ID: Number(contactId + '')
        }, function(err, user) {
            if (user) {
                uploadFile(_getEmail(user), filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }

    function _getEmail(userObj) {
        var email = '';
        userObj.CONTACTINFOS.forEach(function(info) {
            if (info.TYPE === 'EMAIL') {
                email = info.DETAIL;
            }
        });
        return email;
    }

    function _callToHubspot(method, urlPath, data) {
        var options = {
            url: configurationHolder.config.hubspot.url + urlPath,
            method: method,
            json: true,
            body: data
        };
        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }

    function _getHubspotContactByInsightlyContactId(insightlyContactId) {
        return new Promise(function(resolve, reject) {
            domain.User.findOne({
                CONTACT_ID: Number(insightlyContactId + '')
            }, function(err, localDbConatct) {
                if (localDbConatct) {
                    var url = Constants.HUBSPOT_URL.EMAIL_SEARCH + '?email=' + _getEmail(localDbConatct) + '&' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
                    _callToHubspot(GET, url, null).then(function(hubspotContactObject) {
                        if (hubspotContactObject && Object.keys(hubspotContactObject).length > 0) {
                            resolve(hubspotContactObject);
                        } else {
                            reject({
                                message: 'No contact found'
                            });
                        }
                    })
                } else {
                    reject({
                        message: 'No contact found'
                    });
                }
            })
        });
    }

    function _uploadFile(filePath) {
        console.log(filePath, 'FILE PATH')
        var options = {
            url: configurationHolder.config.hubspot.url + Constants.HUBSPOT_URL.FILE + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: '',
            method: "POST",
            formData: {
                file: fs.createReadStream(filePath),
                folder_paths: configurationHolder.config.hubspot.folder
            }
        };
        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    console.log('Error :: ', error)
                    reject(error);
                } else {
                    console.log("body hubspot", body);
                    body = JSON.parse(body);
                    if (body && body.objects && body.objects[0].id) {
                        resolve(body.objects[0].id);
                    } else {
                        reject({
                            message: 'File not uploaded'
                        })
                    }
                }
            })
        })

    }

    function get(vid) {
        var path = Constants.HUBSPOT_URL.CONTACT + 'vid/' + vid + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
        return _callToHubspot(GET, path);
    }

    function saveFile(filePath, contactId) {
        /*uploadFile(contactId, filePath);
        domain.User.findOne({CONTACT_ID: Number(contactId+'')}, function(err, doc){
        	if(doc){
        		uploadFile(_getEmail(doc), filePath);
        	}
        })*/
    }

    function uploadFile(vid, filePath, cb) {

        _uploadFile(filePath).then(function(fileId) {
            var properties = {
                'properties': []
            };
            properties.properties.push({
                'property': (filePath.split('.')[filePath.split('.').length - 1] === 'pdf') ? Fields.CONTACT_FIELD_152 : Fields.CONTACT_FIELD_153,
                'value': fileId
            });
            var contactUrl = Constants.HUBSPOT_URL.CONTACT + 'vid/' + vid + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(POST, contactUrl, properties).then(function(updatedObj) {
                fs.unlinkSync(filePath);
                cb(null, {
                    'fileId': fileId
                });
            }).catch(function(error) {
                console.log('ERROR :::::::::    ', error);
                cb(error, null);
            });

        }).catch(function(error) {
            console.log('FILE RESULT', error);
            cb(error, null);
        });
    }

    return {
        createUser: createUser,
        searchUser: searchUser,
        uploadFile: uploadFile,
        uploadByOtherUser: uploadByOtherUser,
        updateAdvisor: updateAdvisor,
        updateUser: updateUser,
        saveFile: saveFile,
        get: get
    };

})();