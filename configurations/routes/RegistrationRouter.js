var RegistrationController = require("../../application/controllers/common/RegistrationController.js").RegistrationController;
module.exports.routePath = function () {
       router.post('/api/v1/register',RegistrationController.registerUserAction);       
};