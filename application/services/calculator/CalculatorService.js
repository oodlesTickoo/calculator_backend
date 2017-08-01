var UserService = require('./../user/UserService').UserService;
var HubspotService = require('./HubspotService').HubspotService;
const Constants = require('./../../../application-utilities/Constants');
const path = require('path');
const _ = require('lodash');

module.exports.CalculatorService = (function() {
    var pdf = require('html-pdf');
    var fs = require('fs');
    var webshot = require('webshot');
    var http = require("http");
    var ejs = require('ejs');
    var async = require('async');
    var request = require('request');
    var FormData = require('form-data');
    // require('request-debug')(request);

    function renderFile(next, fileName, data) {
        ejs.renderFile(configurationHolder.config.publicFolder + fileName, {
            data: data,
        }, function(err, htmlStr) {
            if (err) {
                next(err, null);
            } else {
                next(null, htmlStr);
            }
        });
    }

    function _getPdfFilePath(contactId) {
        return path.join(__dirname, '..', '..', '..', 'uploads', contactId + '.pdf');
    }

    function generateImage(next, html, imageFileName, data) {
        webshot(html, 'uploads/' + imageFileName, {
            siteType: 'html',
            shotSize: {
                width: data.width,
                height: data.height
            }
        }, function(err, res) {
            console.log(err, res);
            if (err) {
                next(err, null);
            } else {
                next(null, 'uploads/' + imageFileName);
            }
        });
    }

    function getEjsFile(type) {
        var fileName;
        switch (type) {
            case 'ia':
                fileName = 'index_pdf.ejs';
                break;
            case 'sfc':
                fileName = 'indexSFC_pdf.ejs';
                break;
            case 'ra':
                fileName = 'indexRA_pdf.ejs';
                break;
            case 'ttr':
                fileName = 'indexTTR_pdf.ejs';
                break;
            case 'sso':
                fileName = 'indexSSO_pdf.ejs';
                break;
            case 'psf':
                fileName = 'indexPSF.ejs';
                break;
            case 'aa':
                fileName = 'indexAsset.ejs';
                break;
            case 'it':
                fileName = 'indexIT_pdf.ejs';
                break;
        }
        return fileName;
    }

    /*function getEjsFile(type) {
        var fileName;
        switch (type) {
            case 'ia':
                fileName = 'index_portrait.ejs';
                break;
            case 'sfc':
                fileName = 'indexSFC_portrait.ejs';
                break;
            case 'ra':
                fileName = 'indexRA_portrait.ejs';
                break;
            case 'ttr':
                fileName = 'indexTTR_portrait.ejs';
                break;
            case 'sso':
                fileName = 'indexSSO_portrait.ejs';
                break;
            case 'psf':
                fileName = 'indexPSF.ejs';
                break;
            case 'aa':
                fileName = 'indexAsset.ejs';
                break;
            case 'it':
                fileName = 'indexIT_portrait.ejs';
                break;
        }
        return fileName;
    }
*/

    function generateWebShot(next, type, data) {
        var fileName = getEjsFile(type);
        async.auto({
            html: function(next, results) {
                renderFile(next, fileName, data);
            },
            image: ['html', function(next, results) {
                var imageFileName = (new Date()).getTime() + ".png";
                generateImage(next, results.html, imageFileName, data);
            }]
        }, function(err, results) {

            if (err) {
                next(err, null);
            } else {
                next(null, results.image);
            }
        });
    }

    var webShot = function(type, data, res) {
        async.auto({
            image: function(next, results) {
                generateWebShot(next, type, data);
            }
        }, function(err, results) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
            } else {

                var img = fs.readFileSync(results.image);
                fs.unlink(results.image);
                res.writeHead(200, {
                    'Content-Type': 'image/png'
                });
                res.end(img, 'binary');
            }
        });
    };

    var requestPdf = function(data, loggedInUser, res) {
        return new Promise(function(resolve, reject) {
            async.auto({
                webshotIa: function(next, results) {
                    generateWebShot(next, 'ia', data.iaObj);
                },

                webshotSFC: function(next, results) {
                    generateWebShot(next, 'sfc', data.sfcObj);
                },

                webshotIT: function(next, results) {
                    generateWebShot(next, 'it', data.itObj);
                },

                webshotPSF: function(next, results) {
                    generateWebShot(next, 'psf', data.psfObj);
                },

                webshotRA: function(next, results) {
                    generateWebShot(next, 'ra', data.raObj);
                },

                webshotSSO: function(next, results) {
                    generateWebShot(next, 'sso', data.ssoObj);
                },

                webshotTTR: function(next, results) {
                    generateWebShot(next, 'ttr', data.ttrObj);
                },

                webshotAsset: function(next, results) {
                    generateWebShot(next, 'aa', data.aaObj);
                },

                pdf: ['webshotIa', 'webshotSFC', 'webshotIT', 'webshotPSF', 'webshotRA', 'webshotSSO', 'webshotTTR', 'webshotAsset', function(next, results) {
                    var pdfFileName = loggedInUser.hubspotUserId + ".pdf";
                    generatePdf(pdfFileName, results.webshotIa, results.webshotSFC, results.webshotIT, results.webshotPSF, results.webshotRA, results.webshotSSO, results.webshotTTR,
                            results.webshotAsset, data.customFieldMap, loggedInUser)
                        .then(pdfResultObj => next(null, pdfResultObj))
                        .catch(pdfError => next(pdfError, null));
                }]
            }, function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.pdf);
                }
            });
        });
    };

    function generatePdf(pdfFileName, webshotIa, webshotSFC, webshotIT, webshotPSF, webshotRA, webshotSSO, webshotTTR, webshotAsset, customFieldMap, loggedInUser) {
        return new Promise(function(resolve, reject) {
            ejs.renderFile(configurationHolder.config.publicFolder + '/indexHTP.ejs', {
                webshotIa: webshotIa,
                webshotSFC: webshotSFC,
                webshotIT: webshotIT,
                webshotPSF: webshotPSF,
                webshotRA: webshotRA,
                webshotSSO: webshotSSO,
                webshotTTR: webshotTTR,
                webshotAsset: webshotAsset,
                data: customFieldMap
            }, {}, function(err, html) {
                if (html) {
                    var options = {
                        width: '1169px',
                        height: '827px',
                        base: 'file://' + __dirname + '/../../../'
                    };

                    pdf.create(html, options).toFile('uploads/' + pdfFileName, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            HubspotService.uploadFile(loggedInUser.hubspotUserId, _getPdfFilePath(loggedInUser.hubspotUserId))
                                .then(hubspotFile => updateFileIdToUser(loggedInUser, hubspotFile.fileId, _getPdfFilePath(loggedInUser.hubspotUserId)))
                                .then(updatedObj => resolve({
                                    'filePath': configurationHolder.config.downloadUrl + pdfFileName,
                                    'fileName': pdfFileName
                                }))
                                .catch(err => reject(err));
                        }
                    });
                } else {
                    reject(err);
                }
            });
        });
    }

    function updateFileIdToUser(user, fileId, filePath) {
        return new Promise(function(resolve, reject) {
            var format = filePath.split('.')[filePath.split('.').length - 1];
            var fileTypeFieldName = format == 'pdf' ? 'pdfFile' : 'docFile';

            domain.FactFind.update({
                user: user._id
            }, {
                $set: {
                    [fileTypeFieldName]: fileId
                }
            }, function(err, updatedObj) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    var saveFactfindData = function(data, user, res) {
        var factFindData = JSON.parse(JSON.stringify(data));
        factFindData.user = user._id;
        domain.FactFind.update({
            user: user._id
        }, factFindData, {
            upsert: true
        }, function(err, obj) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 500);
            } else {
                //delete user key before sending to hubspot because user field does not exits in hubspot
                delete data.user;
                HubspotService.updateUser(data, user.hubspotUserId)
                    .then(resultData => requestPdf(data, user))
                    .then(pdfResultObj => configurationHolder.ResponseUtil.responseHandler(res, pdfResultObj, 'Pdf successfully created', false, 200))
                    .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400));
            }
        });
    };


    function linkAdvisorToClient(clientId, advisorId, res) {
        domain.User.find({
            _id: {
                $in: [clientId, advisorId]
            }
        }, function(err, users) {
            if (users.length < 2) {
                configurationHolder.ResponseUtil.responseHandler(res, {}, 'client or advisor not found', true, 400);
                return;
            }

            var advisor = _.find(users, function(o) {
                return o.role == 'ADVISOR';
            });
            var client = _.find(users, function(o) {
                return o.role == 'CLIENT';
            });

            HubspotService.updateUser({
                    advisorId: advisor.hubspotUserId
                }, client.hubspotUserId)
                .then(updatedHubspotUser => UserService.updateUser({ "_id": clientId }, {
                    "advisor": mongoose.Types.ObjectId(advisorId)
                }))
                .then(updatedUser => configurationHolder.ResponseUtil.responseHandler(res, updatedUser, 'Client successfully updated.', false, 200))
                .catch(err => configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400));
        });
    }

    //public methods returned
    return {
        webShot: webShot,
        requestPdf: requestPdf,
        saveFactfindData: saveFactfindData,
        updateFileIdToUser: updateFileIdToUser,
        linkAdvisorToClient: linkAdvisorToClient
    };

})();