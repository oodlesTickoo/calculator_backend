global.domain = {};

domain.User = require("../application/models/User.js");
domain.AuthenticationToken = require("../application/models/AuthenticationToken.js");
domain.RegistrationToken = require("../application/models/RegistrationToken.js");
domain.Otp = require("../application/models/Otp.js");
domain.FactFind = require('../application/models/FactFind.js');

module.exports = domain;