/*
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start

var initApp = function() {
    bootApplication()
}

// code to start the server
function bootApplication() {
    app.listen(configurationHolder.config.port, function() {
        console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
    });
}

module.exports.initApp = initApp;
