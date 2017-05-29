const FieldName = require('./../../../application-utilities/FieldName');

module.exports.FileService = (function() {
	var request = require('request');
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
    	console.log(query, project);
    	domain.User.findOne(query, function(err, doc){
    		console.log(err, doc)
    		fileId = (doc && doc.CUSTOMFIELDS.length > 0)? doc.CUSTOMFIELDS[0].FIELD_VALUE: '';
    		callback(fileId);
    	});
    }

    return {
    	get: get
    }

})();
