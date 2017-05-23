/*
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start

var initApp = function() {
    createSuperAdmin()
}

function createSuperAdmin() {
    var saltString = uuid.v1();
    var password = crypto.createHmac('sha1', saltString).update("oodles@admin").digest('hex');
    domain.User.findOne({ firstName: 'SuperAdmin' }, function(err, doc) {
        if (!doc) {
            var superAdminUser = new domain.User({
                firstName: 'SuperAdmin',
                lastName: 'oodles',
                email: 'abc@oodlestechnologies.com',
                salt: saltString,
                password: password,
                role: 'ROLE_SUPERADMIN',
                accountLocked: false,
                mobile: '0123456789',
                isAccountActive: true
            });

            superAdminUser.save(function(err, user) {
                if (err) {
                    CustomLogger.error(err);
                } else {
                    bootApplication();
                    CustomLogger.info(user);
                }
            })
        } else {
            bootApplication();
        }
    });
}

// code to start the server
function bootApplication() {
    app.listen(configurationHolder.config.port, function() {
        console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
    });
}

module.exports.initApp = initApp;
