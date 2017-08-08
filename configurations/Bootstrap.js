/*
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start
var uuid = require('uuid/v1');
var initApp = function() {
    createAdmin()
        .then(result => bootApplication())
        .catch(err => console.log(err));
};
// private methods    
/* method used to  encrypt string using sha1 method , accept value and salt     
 * @payload  password (string) , salt (string)    
 * return encryptedPassword (string)     
 */
var passwordEncryption = function(password, salt) {
    CustomLogger.info("passwordEncryption == " + password + salt);
    encryptedPassword = crypto.createHmac('sha1', salt).update(password.toString()).digest('hex');
    return encryptedPassword;
};
/* method used to  match password enter by client after encrypting it to that of password saved in the database    
 * @payload  User object  and password string     * return boolean true if password matched  , else return false     
 */


function createAdmin() {
    return new Promise(function(resolve, reject) {
        domain.User.findOne({
            role: 'ADMINISTRATOR'
        }, function(err, doc) {
            if (err) {
                console.log("Error in finding ADMINISTRATOR", err);
                reject(err);
            } else if (!doc) {
                var salt = uuid();
                var adminObj = new domain.User({
                    firstName: 'Russell',
                    lastName: 'Medcraft',
                    email: 'russellmedcraft@gmail.com',
                    mobile: '0418261662',
                    role: 'ADMINISTRATOR',
                    password: passwordEncryption("Rusty@.1590", salt),
                    salt: salt
                });
                adminObj.save(function(error, createdUser) {
                    if (error) {
                        console.log("Error in creating ADMINISTRATOR", error);
                        reject(err);
                    } else {
                        console.log("Admin created", createdUser);
                        resolve(createdUser);
                    }
                });
            } else {
                resolve();
            }
        });
    });
}

// code to start the server
function bootApplication() {
    app.listen(configurationHolder.config.port, function() {
        console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
    });
}

module.exports.initApp = initApp;