global.domain = {}

domain.User = require("../application/models/User.js")
domain.AuthenticationToken = require("../application/models/AuthenticationToken.js")
domain.VerificationToken = require("../application/models/VerificationToken.js")
domain.RegistrationToken = require("../application/models/RegistrationToken.js")
domain.ClientAdvisor = require("../application/models/ClientAdvisor.js")
domain.Otp = require("../application/models/Otp.js")

module.exports = domain
