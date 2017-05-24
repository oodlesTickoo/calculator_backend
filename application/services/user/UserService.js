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
                    reject({'User not updated'});
                }
            })
        })
    }

    return {
        save: save,
        update: update,
        searchUser: searchUser
    }

})();