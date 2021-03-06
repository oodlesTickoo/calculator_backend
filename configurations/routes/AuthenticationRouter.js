/** 
 * @author Abhimanyu
 * This program will be used to define the api mapping for login  and make the express router know about the routing path
 */
 var CalculatorController = require("../../application/controllers/calculator/CalculatorController.js").CalculatorController;
var AuthenticationController = require("../../application/controllers/common/AuthenticationController.js").AuthenticationController;
module.exports.routePath = function () {
       router.post('/api/v1/login', CalculatorController.login);
       router.get('/api/v1/logout', AuthenticationController.logoutAction);
};