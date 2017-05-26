var FieldName = require('./../../../application-utilities/FieldName');
module.exports.UserService = (function() {

    function save(userObj) {
        return new Promise(function(resolve, reject) {
            var user = _modifyContactObj(userObj);
            user = new domain.User(userObj);
            user.save(function(err, createdUser) {
                if (!err && createdUser) {
                    resolve(createdUser);
                } else {
                    reject(err);
                }
            })
        })
    }

    function _modifyContactObj(contactObj) {
        contactObj.CONTACT_ID = Number(contactObj.CONTACT_ID + '');
        contactObj.OWNER_USER_ID = contactObj.OWNER_USER_ID ? Number(contactObj.OWNER_USER_ID + '') : null
        contactObj.VISIBLE_TEAM_ID = contactObj.VISIBLE_TEAM_ID ? Number(contactObj.VISIBLE_TEAM_ID + '') : null
        return contactObj;
    }

   /* function save(userObj, res) {
        return searchUser(_getPhoneNumberFromUserObejct(userObj)).then(function(result) {
            if (!result || result.length == 0) {
                _saveUser(userObj).then(function(result) {
                    configurationHolder.ResponseUtil.responseHandler(res, result, "User Created Successfully", false, 200);
                }).catch(function(err) {
                    configurationHolder.ResponseUtil.responseHandler(res, err, err.message, true, 400);
                })
            } else {
                configurationHolder.ResponseUtil.responseHandler(res, null, 'User already exists', true, 400);
            }
        }).catch(function(err) {

        })
    }*/

    function searchUser(phoneNumber) {
        return new Promise(function(resolve, reject) {
            domain.User.find({
                'CONTACTINFOS.DETAIL': phoneNumber
            }, function(err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    function update(userObj){
        return new Promise(function(resolve, reject){
            db.User.update({'CONTACT_ID': userObj.CONTACT_ID},userObj, function(err, result){
                if(!err && result.nModified > 0){
                    resolve(userObj);
                } else {
                    reject({'message':'User not updated'});
                }
            })
        })
    }

    function list(type){
        var match = {
            '$match': {
                'CUSTOMFIELDS': {
                    '$elemMatch': {
                        'CUSTOM_FIELD_ID': FieldName.USER_TYPE,
                        'FIELD_VALUE': type
                    }
                }
            }
        };
        var project = {
            '$project': {
                'name': {
                    '$concat': [
                        '$FIRST_NAME', ' ', '$LAST_NAME'
                    ]
                }
            }
        };
        return new Promise(function(resolve, reject){
            domain.User.aggregate([match, project], function(err, result){
                if(err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    function clientsOfAnAdvisor(advisorId){
        var match = {
            '$match': {
                'CUSTOMFIELDS': {
                    '$elemMatch': {
                        'CUSTOM_FIELD_ID': FieldName.ADVISOR_ID,
                        'FIELD_VALUE': advisorId+''
                    }
                }
            }
        };
        var project = {
            '$project': {
                'name': {
                    '$concat': [
                        '$FIRST_NAME', ' ', '$LAST_NAME'
                    ]
                },
                'CONTACT_ID': '$CONTACT_ID'
            }
        };
        return new Promise(function(resolve, reject){
            domain.User.aggregate([match, project], function(err, result){
                if(err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    function listAdvisorClient(){
        
        return new Promise(function(resolve, reject){
            domain.User.find({}, function(err, result){
                if(err)
                    reject(err);
                else
                    resolve(_clientAdvisorData(result));
            })
        })
    }

    function updatePdfFile(contactId, fileId){
        return new Promise(function(resolve, reject){
            domain.User.findOne({
                CONTACT_ID: contactId
            }, function(err, result){
                if(err || !result){
                    reject(err);
                } else {
                    var fileIndex = -1;
                    for(var i=0;i<result.CUSTOMFIELDS.length;i++){
                       if(result.CUSTOMFIELDS[i].CUSTOM_FIELD_ID === FieldName.FILE_ID){
                            fileIndex = i;
                            result.CUSTOMFIELDS[i].FIELD_VALUE = fileId+'';
                            break;
                        }
                    }
                    if(fileIndex === -1){
                        result.CUSTOMFIELDS.push({
                            CUSTOM_FIELD_ID: FieldName.FILE_ID,
                            FIELD_VALUE: fileId+''
                        });
                    }
                    result.save(function(err, data){
                        if(err)
                            reject(err);
                        else
                            resolve(data);
                    })
                }
            });
        })
    }

    function _clientAdvisorData(data){
        var map = {};
        data.forEach(function(user){
            user.CUSTOMFIELDS.forEach(function(customField){
                if(customField.CUSTOM_FIELD_ID === FieldName.USER_TYPE && customField.FIELD_VALUE === 'ADVISOR'){
                    if(!map[user.CONTACT_ID+'']){
                        map[user.CONTACT_ID+''] = {};
                    }
                    if(!map[user.CONTACT_ID+''].advisor){
                        map[user.CONTACT_ID+''].advisor = {};
                        map[user.CONTACT_ID+''].advisor.CONTACT_ID = user.CONTACT_ID;
                        map[user.CONTACT_ID+''].advisor.FIRST_NAME = user.FIRST_NAME;
                        map[user.CONTACT_ID+''].advisor.LAST_NAME = user.LAST_NAME;
                    }
                } else if(customField.CUSTOM_FIELD_ID === FieldName.ADVISOR_ID && customField.FIELD_VALUE){
                    
                    if(!map[customField.FIELD_VALUE+'']){
                        map[customField.FIELD_VALUE+''] = {};
                    }
                    if(!map[customField.FIELD_VALUE+''].clients){
                        map[customField.FIELD_VALUE+''].clients = [];
                    }
                    map[customField.FIELD_VALUE+''].clients.push({CONTACT_ID: user.CONTACT_ID, FIRST_NAME: user.FIRST_NAME, LAST_NAME: user.LAST_NAME});
                }
            })
        })
        return Object.values(map);
    }

    return {
        save: save,
        update: update,
        searchUser: searchUser,
        list: list,
        listAdvisorClient: listAdvisorClient,
        clientsOfAnAdvisor: clientsOfAnAdvisor,
        updatePdfFile: updatePdfFile
    }

})();