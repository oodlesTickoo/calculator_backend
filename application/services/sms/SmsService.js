module.exports.SmsService = (function() {

    var Nexmo = require('nexmo');

    var nexmo = new Nexmo({
        apiKey: '514d3d3a',
        apiSecret: '290949b35aafb9f7',
    });

    var send = function(recipient, otp, callback) {
        var sender = 'NEXMO';
        var message = 'your otp is ' + otp;
        var options = {
            debug: true
        };
        //recipient="919818572692";
        nexmo.message.sendSms(sender, recipient, message, options, callback);
    };

    //return the method which you want it to be public
    return {
        send: send
    };

})();