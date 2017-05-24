/*
 * @author Abhimanyu
 * This program is used to include the various routing path in the express router
 */


// variable to include the different Routing module
var routingFiles = ["Authentication", "Registration", "Calculator","User"]

// for-loop on routingFiles array to export each routes
routingFiles.forEach(function(routes) {
    routes = require('./' + routes + "Router.js");
    routes.routePath(router) //router is the express router  defined globally in app.js file
});
