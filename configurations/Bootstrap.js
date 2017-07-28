/*
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start

var initApp = function() {
    createAdmin()
        .then(result => bootApplication())
        .catch(err => console.log(err))
}

function createAdmin() {
    return new Promise(function(resolve, reject) {
        domain.User.findOne({
            role: 'ADMINISTRATOR'
        }, function(err, doc) {
            if (err) {
                console.log("Error in finding ADMINISTRATOR", err)
                reject(err);
            } else if (!doc) {
                var adminObj = new domain.User({
                    firstName: 'Russell',
                    lastName: 'Medcraft',
                    email: 'kartik@gmail.com',
                    mobile: '1234567890',
                    role: 'ADMINISTRATOR'
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