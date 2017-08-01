const CalculatorService = require('./CalculatorService').CalculatorService;
const HubspotService = require('./HubspotService').HubspotService;

module.exports.FileService = (function() {

    var request = require('request');
    var fs = require('fs');
    var path = require('path');

    function getUserFile(loggedInUser, userId, fileType, res) {
        domain.User.findOne({
            _id: userId
        }, function(err, userObj) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else if (userObj) {
                domain.FactFind.findOne({
                    user: userId
                }, function(err, factFindObj) {
                    if (err) {
                        configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
                    } else {
                        //soa stands for 'Statement of advice PDF'
                        var fileId;
                        if (fileType == 'soa' && factFindObj.pdfFile) {
                            fileId = factFindObj.pdfFile ;
                        } else if (fileType == 'advisor_soa' && factFindObj.docFile) {
                            fileId = factFindObj.docFile; 
                        } else{
                            configurationHolder.ResponseUtil.responseHandler(res, {}, "File not found", true, 400);
                            return;
                        }
                        var options = {
                            url: configurationHolder.config.hubspot.file_url + '/' + fileId + '/' + configurationHolder.config.hubspot.folder + '/' + userObj.hubspotUserId + '.' + format.toLowerCase(),
                            method: "GET"
                        };
                        request(options).pipe(res);
                        /*if (format === 'pdf') {
                               
                           } else {
                               var fileName = contactId + '_' + new Date().getTime() + '_download.docx';
                               var stream = request(options).pipe(fs.createWriteStream(_getPdfFilePath(fileName)));
                               stream.on('finish', function() {
                                   configurationHolder.ResponseUtil.responseHandler(res, {
                                       'file': fileName
                                   }, 'File url', false, 200);
                               });
                           }*/

                    }
                });
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, {}, "user not found", true, 400);
            }
        });
    }

    function upload(file, clientId, res) {
        domain.User.findOne({
            id: clientId
        }, function(err, userObj) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else {
                var nameSplitArray = file.name.split('.');
                var extension = nameSplitArray[nameSplitArray.length - 1];
                var fileName = userObj.hubspotUserId + '.' + extension;
                var folder = 'uploads/' + fileName;
                fs.rename(
                    file.path, folder,
                    function(err) {
                        if (err) {
                            configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
                        } else {
                            _updateFile(fileName, userObj, res)
                                .then(result => configurationHolder.ResponseUtil.responseHandler(res, result, 'File uploaded successfully', false, 200))
                                .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500));
                        }
                    });
            }
        });
    }

    function _getPdfFilePath(fileName) {
        return path.join(__dirname, '..', '..', '..', 'uploads', fileName);
    }

    function _updateFile(fileName, userObj, res) {
        return new Promise(function(resolve, reject) {
            HubspotService.uploadFile(userObj.hubspotUserId, _getPdfFilePath(fileName))
                .then(fileData => CalculatorService.updateFileIdToUser(userObj, fileData.fileId, _getPdfFilePath(fileName)))
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    return {
        getUserFile: getUserFile,
        upload: upload
    };

})();