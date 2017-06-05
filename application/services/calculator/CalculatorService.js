var UserService = require('./../user/UserService').UserService;
var AuthService = require('./../user/AuthService').AuthService;
var HubspotService = require('./HubspotService').HubspotService;
const Constants = require('./../../../application-utilities/Constants');
const FieldName = require('./../../../application-utilities/FieldName');
const path = require('path');
var ClientAdvisorService = require('./../user/ClientAdvisorService').ClientAdvisorService;

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

    function _getPdfFilePath(contactId){
        return path.join(__dirname, '..', '..', '..', 'uploads',contactId+'.pdf');
    }

    function generateImage(next, html, imageFileName) {
        webshot(html, 'uploads/' + imageFileName, {
            siteType: 'html',
            shotSize: {
                width: "all",
                height: "all"
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
                fileName = 'indexIA.ejs';
                break;
            case 'sfc':
                fileName = 'indexSFC.ejs';
                break;
            case 'ra':
                fileName = 'indexRA.ejs';
                break;
            case 'ttr':
                fileName = 'indexTTR.ejs';
                break;
        }
        return fileName;
    }

    function generateWebShot(next, type, data) {
        var fileName;

        fileName = getEjsFile(type);

        async.auto({
            html: function(next, results) {
                renderFile(next, fileName, data);
            },
            image: ['html', function(next, results) {
                var imageFileName = (new Date()).getTime() + ".png";
                generateImage(next, results.html, imageFileName);
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
        var fileName;
        fileName = getEjsFile(type);

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
        async.auto({
            webshotIa: function(next, results) {
                var data = {
                    "age": 50,
                    "grossAnnualIncome": 120000,
                    "funeralCost": 20000,
                    "familyLivingCostPerYear": 90000,
                    "hasSpouse": true,
                    "hasChildren": true,
                    "sickLeaves": 20,
                    "assets": {
                        "homeValue": 800000,
                        "cashAtBank": 20000,
                        "otherInvestment": 20000,
                        "superBalance": 100000
                    },
                    "existingCovers": {
                        "life": 20000,
                        "TPD": 0,
                        "IP": 0,
                        "trauma": 0
                    },
                    "assumptions": {
                        "inflation": 2,
                        "rateOfReturn": 5
                    },
                    "liabilities": {
                        "homeMortgage": 20000,
                        "investmentPropertyMortgage": 10000,
                        "creditCardDebt": 3000,
                        "carLoan": 20000,
                        "personalLoan": 10000,
                        "otherLoan": 0
                    },
                    "spouseDetails": {
                        "age": 47,
                        "isWorking": true,
                        "salary": 50000,
                        "moveToSmallerProperty": true,
                        "valueOfNewProperty": 500000,
                        "moneyToBeBorrowed": 400000
                    },
                    "childrenDetails": {
                        "numChildren": 0,
                        "ages": [3, 7],
                        "educationExpensePerYearPerChild": 2000
                    }
                };
                generateWebShot(next, 'ia', data);
            },
            webshotSFC: function(next, results) {
                var data = {
                    "age": 47,
                    "retirementAge": 67,
                    "annualSalary": 60000,
                    "superBalance": 100000,
                    "cc": 10000,
                    "ncc": 10000,
                    "ecLevel": 9.5,
                    "inflation": 2.5,
                    "wageIncrease": 3.5,
                    "insurancePremiumPerYear": 200,
                    "netReturnRate": 1.50,
                    "fundIndexA": 0,
                    "fundIndexB": 1,
                    "specifiedFundA": true,
                    "specifiedNameA": "tickoo",
                    "specifiedAnnualPercFeeA": 1.5,
                    "specifiedAnnualPercFeeB": 1.5,
                    "specifiedAdminFeeA": 100,
                    "specifiedAdminFeeB": 100,
                    "specifiedIndirectCostA": 1.5,
                    "specifiedIndirectCostB": 1.5,
                    "specifiedFundB": true,
                    "specifiedNameB": "kartik"
                };

                generateWebShot(next, 'sfc', data);
            },
            pdf: ['webshotIa', 'webshotSFC', function(next, results) {
                var pdfFileName = loggedInUser.CONTACT_ID + ".pdf";

                console.log("55555555555555555", results.webshotIa, results.webshotSFC);
                generatePdf(next, pdfFileName, results.webshotIa, results.webshotSFC, loggedInUser);
            }]
        }, function(err, results) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, results.pdf, "Pdf successfully created", false, 200);
            }
        });
    };

    function generatePdf(next, pdfFileName, image1, image2, loggedInUser) {
        ejs.renderFile(configurationHolder.config.publicFolder + '/pdf.ejs', {
            image1: image1,
            image2: image2
        }, {}, function(err, html) {
            if (html) {
                var options = {
                    format: 'Letter',
                    base: 'file://' + __dirname + '/../../../'
                };

                pdf.create(html, options).toFile('uploads/' + pdfFileName, function(err, result) {
                    if (err) {
                        next(err, null);
                    } else {
                        saveAttachmentToInsightly(_getPdfFilePath(loggedInUser.CONTACT_ID),loggedInUser.CONTACT_ID).then(function(fileData){
                            HubspotService.uploadFile('ope@hubspot.com', _getPdfFilePath(loggedInUser.CONTACT_ID));
                            updateFileToUser(loggedInUser.CONTACT_ID, fileData.FILE_ID, _getPdfFilePath(loggedInUser.CONTACT_ID), function(){
                                next(null, null);
                            });
                        }).catch(function(err){
                            console.log(err)
                            next(err, null);
                        });
                    }
                });
            } else {
                next(err, null);
            }
        });
    }

    function createUser(data) {
        /*var body = {
            "FIRST_NAME": data.firstName,
            "LAST_NAME": data.lastName,
            "CONTACTINFOS": [{
                "TYPE": "PHONE",
                "DETAIL": data.mobile
            }, {
                "TYPE": "EMAIL",
                "DETAIL": data.email
            }],
        };*/
        var options = {
            url: configurationHolder.config.insightly.url,
            headers: {
                'Authorization': configurationHolder.config.insightly.auth,
                'Content-Type': configurationHolder.config.insightly.contentType
            },
            json: true,
            body: data,
            method: "POST"
        };
        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                // console.log('REQUEST RESULTS:', error, response.statusCode, body);
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        })
    }

    function getUser(mobileNumber) {
        var options = {
            url: configurationHolder.config.insightly.url + configurationHolder.config.insightly.searchContact + "phone_number=" + mobileNumber,
            headers: {
                'Authorization': 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    body = JSON.parse(body);
                    if (body && body.length > 0) {
                        resolve(body[0]);
                    } else {
                        reject(null);
                    }
                }
            });
        })
    }

    function getById(contactId) {
        var options = {
            url: configurationHolder.config.insightly.url +'/'+contactId,
            headers: {
                'Authorization': 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    body = JSON.parse(body);
                    if (body) {
                        resolve(body);
                    } else {
                        reject({'message':'User not found'});
                    }
                }
            });
        })
    }

    function insightlyBody(data) {
        return {
            "FIRST_NAME": data.firstName,
            "LAST_NAME": data.lastName,
            "CONTACTINFOS": [{
                "TYPE": "PHONE",
                "DETAIL": data.mobile
            }, {
                "TYPE": "EMAIL",
                "DETAIL": data.email
            }],
        };
    }

    function updateUser(data) {

        var options = {
            url: configurationHolder.config.insightly.url,
            headers: {
                'Authorization': configurationHolder.config.insightly.auth,
                'Content-Type': 'application/json'
            },
            json: true,
            body: data,
            method: "PUT"
        };
        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    //body = JSON.parse(body);
                    resolve(body);
                }
            });
        })
    }

    function addAttachment(next, data) {
        var options = {
            url: configurationHolder.config.insightly.url + '/217586746' + configurationHolder.config.insightly.saveAttachment,
            headers: {
                'Authorization': configurationHolder.config.insightly.auth,
                'Content-Type': 'multipart/form-data'
            },
            body: '',
            method: "POST",
            formData: {
                attachments: [
                    fs.createReadStream(__dirname + '/test.pdf'),
                ]
            }
        };

        request(options, function(error, response, body) {
            if (error) {
                next(error, null);
            } else {
                body = JSON.parse(body);
                next(null, body);
            }
        });
    }

    function requestAssignedClientList(next, data) {
        var sampleObject = {
            fullName: "",
            pdfPath: ""
        };
        var options = {
            url: configurationHolder.config.insightly.url,
            headers: {
                'Authorization': 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
            }
        };
        request(options, function(error, response, body) {
            if (error) {
                next(error, null);
            } else {

                body = JSON.parse(body);
                if (body && body.length > 0) {
                    var num = 0;
                    for (i = 0; i < body.length; i++) {
                        if (body[i].description == "client" && data.name == body[i].advisorName) {
                            clientList[num] = sampleObject;
                            clientList[num].fullName = body[i].FIRST_NAME + body[i].FIRST_NAME.LAST_NAME;
                            clientList[num].pdfPath = body[i].pdfPath;
                            num++;
                        }
                    }
                    console.log("clientList", clientList);
                    next(null, clientList);
                } else {
                    next(null, false);
                }
            }
        });
    }

    function requestMasterClientList(next, data) {
        var sampleObject = {
            fullName: "",
            pdfPath: ""
        };
        var options = {
            url: configurationHolder.config.insightly.url,
            headers: {
                'Authorization': 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
            }
        };
        request(options, function(error, response, body) {
            if (error) {
                next(error, null);
            } else {

                body = JSON.parse(body);
                var clientList = [];
                if (body && body.length > 0) {
                    var num = 0;
                    for (i = 0; i < body.length; i++) {
                        if (body[i].description == "client") {
                            clientList[num] = sampleObject;
                            clientList[num].fullName = body[i].FIRST_NAME + body[i].FIRST_NAME.LAST_NAME;
                            clientList[num].pdfPath = body[i].pdfPath;
                            num++;
                        }
                    }
                    console.log("clientList", clientList);
                    next(null, clientList);
                } else {
                    next(null, false);
                }
            }
        });
    }

    function requestMasterAdvisorList(next, data) {
        var sampleObject = {
            fullName: "",
            pdfPath: ""
        };
        var options = {
            url: configurationHolder.config.insightly.url,
            headers: {
                'Authorization': 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
            }
        };
        request(options, function(error, response, body) {
            if (error) {
                next(error, null);
            } else {

                body = JSON.parse(body);
                var advisorList = [];
                if (body && body.length > 0) {
                    var num = 0;
                    for (i = 0; i < body.length; i++) {
                        if (body[i].description == "advisor") {
                            advisorList[num] = sampleObject;
                            advisorList[num].fullName = body[i].FIRST_NAME + body[i].FIRST_NAME.LAST_NAME;
                            advisorList[num].pdfPath = body[i].pdfPath;
                            num++;
                        }
                    }
                    console.log("advisorList", advisorList);
                    next(null, advisorList);
                } else {
                    next(null, false);
                }
            }
        });
    }

    var login = function(data, res) {
        var phoneNumber = _getPhoneNumberFromUserObject(data);
        /**
        * Search user by phone number on local db
        */
        UserService.searchUser(phoneNumber).then(function(searchUser) {
            if (!searchUser || searchUser.length === 0) {
                /**
                * Save user on insightly
                */
                createUser(data).then(function(result) {
                    /**
                    * Save user on Hotspot
                    */
                    HubspotService.save(data);
                    /**
                    * Save user on local DB
                    */
                    return UserService.save(result)
                }).then(function(result) {
                    _loginResponseData(result, res);
                }).catch(function(err) {
                    configurationHolder.ResponseUtil.responseHandler(res, err, err.message || 'Login failed', true, 400);
                })
            } else {
                _loginResponseData(searchUser[0], res);
            }
        })
    };

    function _loginResponseData(userObj, res) {
        ClientAdvisorService.createClientAdvisor(userObj, function() {
            var role = _getUserRoleFromUserObject(userObj);
            var promises = [];
            promises.push(AuthService.generateAuthToken(userObj));
            switch (role) {
                case Constants.USER_ROLE.ADVISOR:
                    {
                        promises.push(UserService.clientsOfAnAdvisor(userObj.CONTACT_ID));
                        break;
                    }
                case Constants.USER_ROLE.ADMINISTRATOR:
                    {
                        promises.push(UserService.clientsOfAnAdvisor(userObj.CONTACT_ID));
                        promises.push(UserService.listAdvisorClient());
                        promises.push(ClientAdvisorService.list());
                        break;
                    }
            }
            Promise.all(promises).then(function(results) {
                var returnOnject = {};
                returnOnject.me = userObj;
                returnOnject.token = results[0].auth_token;
                returnOnject.role = role;
                switch (role) {
                    case Constants.USER_ROLE.ADVISOR:
                        {
                            returnOnject.my_clients = results[1];
                            break;
                        }
                    case Constants.USER_ROLE.ADMINISTRATOR:
                        {
                            returnOnject.my_clients = results[1];
                            returnOnject.advisors = results[2];
                            returnOnject.clientAdvisor = results[3]
                            break;
                        }
                }
                configurationHolder.ResponseUtil.responseHandler(res, returnOnject, "Successfully login", false, 200);
            }).catch(function(err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message || 'Login failed', true, 400);
            });
        })
    }

    var getData = function(data, res) {
        async.auto({
            userInfo: function(next) {
                getUser(next, data);
            }
        }, function(err, results) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, results, "User Data successfully captured", false, 200);
            }
        });
    };

    var saveData = function(data, res) {
        updateUser(data).then(function(result) {
            return UserService.update(data);
        }).then(function(result) {
            configurationHolder.ResponseUtil.responseHandler(res, result, "User updated", false, 200);
        }).catch(function(err) {
            configurationHolder.ResponseUtil.responseHandler(res, err, err.message || 'Error while updating User', true, 400);
        })
    };

    var saveAttachment = function(data, res) {
        async.auto({
            sendAttachment: function(next) {
                addAttachment(next, data);
            }
        }, function(err, results) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, results, "File added.", false, 200);
            }
        });
    };

    var getAssignedClientList = function(data, res) {
        async.auto({
            assignedClientList: function(next) {
                requestAssignedClientList(next, data);
            }
        }, function(err, results) {
            if (err) {
                configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, results, "assigned Client List successfully captured", false, 200);
            }
        });
    };

    var getMasterClientList = function(res) {

        UserService.list('CLIENT').then(function(result) {
            configurationHolder.ResponseUtil.responseHandler(res, result, "Master Client list successfully captured", false, 200);
        }).catch(function(err) {
            configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
        })
    };

    var getMasterAdvisorList = function(res) {

        UserService.listAdvisorClient().then(function(result) {
            configurationHolder.ResponseUtil.responseHandler(res, result, "User Data successfully captured", false, 200);
        }).catch(function(err) {
            configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
        })

    };

    function _getPhoneNumberFromUserObject(userObj) {
        var phoneNumber = null;
        if (userObj && userObj.CONTACTINFOS) {
            userObj.CONTACTINFOS.forEach(function(contactInfo) {
                if (contactInfo.TYPE === 'PHONE') {
                    phoneNumber = contactInfo.DETAIL;
                }
            })
        }
        return phoneNumber;
    }

    function _getUserRoleFromUserObject(userObj) {
        var role = '';
        for (var i = 0; i < userObj.CUSTOMFIELDS.length; i++) {
            if (userObj.CUSTOMFIELDS[i].CUSTOM_FIELD_ID === FieldName.USER_TYPE) {
                role = userObj.CUSTOMFIELDS[i].FIELD_VALUE;
                break;
            }
        }
        return role;
    }

    function saveAttachmentToInsightly(filePath, contactId) {
        console.log("File Path", filePath);
        var options = {
            url: configurationHolder.config.insightly.url + '/' + contactId + '' + configurationHolder.config.insightly.saveAttachment,
            headers: {
                'Authorization': configurationHolder.config.insightly.auth,
                'Content-Type': 'multipart/form-data'
            },
            body: '',
            method: "POST",
            formData: {
                attachments: [
                    fs.createReadStream(filePath),
                ]
            }
        };
        return new Promise(function(resolve, reject){
            request(options, function(error, response, body) {
                if (error) {
                    request(error);
                } else {
                    body = JSON.parse(body);
                    console.log(body);
                    resolve(body);
                }
            });
        });
    }

    function updateFileToUser(contactId, fileId, filePath, callback){
        var format = filePath.split('.')[filePath.split('.').length - 1]
        UserService.updateFile(contactId, fileId, format).then(function(userData){
            delete userData['_id'];
            return updateUser(userData);
        }).then(function(userData){
            //fs.unlinkSync(filePath);
            callback();
        }).catch(function(err){
            console.log("Error ", err)
            callback()
        });
    }

    function linkAdvisorToClient(clientId, advisorId, res) {
        ClientAdvisorService.clientAdvisor(clientId, advisorId).then(function(result){

            getById(clientId).then(function(clientObj){
                
                clientObj = ClientAdvisorService.setAdvisorToClientObject(clientObj, advisorId);
                /**
                * Update advisor on insightly
                */
                updateUser(clientObj).then(function(results){
                    /**
                    * Update advisor on hubspot
                    */
                    HubspotService.updateAdvisor(clientObj, advisorId);
                    /**
                    * Update advisor on local DB
                    */
                    UserService.update(clientObj).then(function(updatedUser){
                        configurationHolder.ResponseUtil.responseHandler(res, results, 'Client successfully updated.', false, 200);
                    });
                })
            })
        }).catch(function(err){
            configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
        })
    }

    //public methods are  return
    return {
        webShot: webShot,
        requestPdf: requestPdf,
        login: login,
        getData: getData,
        saveData: saveData,
        saveAttachment: saveAttachment,
        getAssignedClientList: getAssignedClientList,
        getMasterClientList: getMasterClientList,
        getMasterAdvisorList: getMasterAdvisorList,
        saveAttachmentToInsightly: saveAttachmentToInsightly,
        updateFileToUser: updateFileToUser,
        getById:getById,
        updateUser: updateUser,
        linkAdvisorToClient: linkAdvisorToClient
    };

})();