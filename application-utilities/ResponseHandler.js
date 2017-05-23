
var responseHandler = function(res,responseObject,message,error,status){
    console.log(responseObject);
    console.log(status);
	res.status(status).send({
		"error":error,
		"message":message,
		"response":responseObject
	});
    res.end();
};

module.exports.responseHandler = responseHandler;