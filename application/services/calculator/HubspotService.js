var hubspotUserFields = require('../../../application-utilities/HubspotUserFields'),
    Constants = require('../../../application-utilities/Constants'),
    hubspotFactFindFields = require('../../../application-utilities/HubspotFactFindFields');

module.exports.HubspotService = (function() {
    var request = require('request');
    var fs = require('fs');

    const ACCESS_KEY = 'hapikey',
        POST = 'post',
        GET = 'get',
        PUT = 'put';


    function _convertToHubspotPostData(fields, obj) {
        var convertedObj = {};
        convertedObj.properties = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fields[key]) {
                    convertedObj.properties.push({
                        'property': fields[key],
                        'value': obj[key]
                    });
                }
            }
        }
        return convertedObj;
    }

    function createUser(userObj) {
        var data = _convertToHubspotPostData(hubspotUserFields, userObj);
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
            var contactUrl = Constants.HUBSPOT_URL.CONTACT + 'vid/' + hubspotUserId + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            _callToHubspot(POST, contactUrl, _convertToHubspotPostData(hubspotFactFindFields, data.factFindData))
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
                    if (response.statusCode == 204) {
                        resolve(true);
                    } else {
                        resolve(body);
                    }
                }
            });
        });
    }

    function _uploadFile(filePath) {
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
                    console.log('Error :: ', error);
                    reject(error);
                } else {
                    body = JSON.parse(body);
                    if (body && body.objects && body.objects[0].id) {
                        resolve(body.objects[0].id);
                    } else {
                        reject({
                            message: 'File not uploaded'
                        });
                    }
                }
            });
        });
    }

    function uploadFile(hubspotUserId, filePath) {
        return new Promise(function(resolve, reject) {
            var hubspotFileId;
            _uploadFile(filePath)
                .then(fileId => {
                    hubspotFileId = fileId;
                    var properties = {
                        'properties': []
                    };
                    properties.properties.push({
                        'property': (filePath.split('.')[filePath.split('.').length - 1] === 'pdf') ? hubspotFactFindFields.pdfFile : hubspotFactFindFields.docFile,
                        'value': fileId
                    });
                    var contactUrl = Constants.HUBSPOT_URL.CONTACT + 'vid/' + hubspotUserId + '/profile' + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
                    return _callToHubspot(POST, contactUrl, properties);
                })
                .then(updatedObj => {
                    fs.unlinkSync(filePath);
                    resolve({
                    });
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    function getFile(fileId) {
        return new Promise(function(resolve, reject) {
            var contactUrl = Constants.HUBSPOT_URL.FILE + '/' + fileId + '?' + ACCESS_KEY + '=' + configurationHolder.config.hubspot.hapikey;
            return _callToHubspot(GET, contactUrl, null)
                .then(result => {
                    resolve(result.url);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }


    return {
        createUser: createUser,
        searchUser: searchUser,
        updateUser: updateUser,
        updateAdvisor: updateAdvisor,
        uploadFile: uploadFile,
        getFile:getFile
    };

})();