const FieldName = require('./../../../application-utilities/FieldName');
const CalculatorService = require('./CalculatorService').CalculatorService;

module.exports.FileService = (function() {

	var request = require('request');
	var fs = require('fs');
	var path = require('path');

	function get (res, contactId, format) {

		_getFileId(contactId, format, function(fileId){
			if(fileId.length > 0){
				var options = {
            		url: configurationHolder.config.insightly.url.replace('/Contacts','') + configurationHolder.config.insightly.saveAttachment + '/'+ fileId,
            		headers: {
                		'Authorization': configurationHolder.config.insightly.auth
            		},
            		method: "GET"
        		};
        		request(options).pipe(res);
			} else {
                configurationHolder.ResponseUtil.responseHandler(res, {}, 'File not found', true, 400);
			}
		})
    }

    function _getFileId(contactId, format, callback) {
    	
    	var query;

    	var project = {
    		'CUSTOMFIELDS.$': 1
    	 };

    	if(format === 'pdf'){
    		query = {
    			'CONTACT_ID': contactId,
    			'CUSTOMFIELDS.CUSTOM_FIELD_ID': FieldName.FILE_ID
    		};
    	} else {
    		query = {
    			'CONTACT_ID': contactId,
    			'CUSTOMFIELDS.CUSTOM_FIELD_ID': FieldName.DOC_FILE
    		};
    	}

    	domain.User.findOne(query, project, function(err, doc){
    		fileId = (doc && doc.CUSTOMFIELDS.length > 0)? doc.CUSTOMFIELDS[0].FIELD_VALUE: '';
    		callback(fileId);
    	});
    }

    function upload(file, contactId, res){
    	var nameSplitArray = file.name.split('.')
    	var extension = nameSplitArray[nameSplitArray.length-1];
    	var fileName = contactId+'.'+extension;
    	var folder = 'uploads/'+fileName;
    	fs.rename(
			file.path,folder,function(err){
			if(err){
        		configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
       		}else{
       			_updateFile(fileName, contactId, res);
           	}
    	});
    }

    function _getPdfFilePath(fileName){
        return path.join(__dirname, '..', '..', '..', 'uploads',fileName);
    }

    function _updateFile(fileName, contactId, res){
    	CalculatorService.saveAttachmentToInsightly(_getPdfFilePath(fileName),contactId).then(function(fileData){
            CalculatorService.updateFileToUser(contactId, fileData.FILE_ID, _getPdfFilePath(fileName), function(){
                configurationHolder.ResponseUtil.responseHandler(res, {}, 'Success', false, 200);
            });
        }).catch(function(err){
            console.log(err)
            configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
        });
    }

    return {
    	get: get,
    	upload: upload
    }

})();