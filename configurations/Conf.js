//add Roles in the system
var roles = ['ROLE_ANONYMOUS', 'ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'];

// Add different accessLevels 
var accessLevels = {
    'anonymous': ['ROLE_USER', 'ROLE_ANONYMOUS', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'user': ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'admin': ['ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'superadmin': ['ROLE_SUPERADMIN']
};

var configVariables = function() {
    var config;
    switch (process.env.NODE_ENV) {
        case 'development':
            config = {
                port: 3000,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                downloadUrl: 'http://localhost:3000/download/',
                publicFolder: 'public/templates/',
                uploadFolder: 'uploads',
                awsAccessKeyId: '',
                awsSecretAccessKey: '',
                bucketname: '',
                emailFrom: 'abc@oodlestechnologies.com',
                emailPassword: '!abc@oodles',
                verificationEmailSubject: 'Welcome!',
                insightly:{
                    url:'https://api.insight.ly/v2.2/Contacts',
                    searchContact:'/Search?',
                    saveAttachment:'/FileAttachments',
                    auth: 'Basic Y2U0NGU2ZDMtZmIxYy00NzhhLWJhNGEtOTVlNjQzMGM5MDZh'
                }

            };
            config.roles = roles;
            config.accessLevels = accessLevels;
            break;
        case 'staging':
            config = {
                port: 80,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000/download/',
                publicFolder: 'public/templates/',
                uploadFolder: 'uploads',
                awsAccessKeyId: '',
                awsSecretAccessKey: '',
                bucketname: '',
                emailFrom: 'abc@oodlestechnologies.com',
                emailPassword: '!abc@oodles',
                verificationEmailSubject: 'Welcome!'

            }
            config.roles = roles
            config.accessLevels = accessLevels
            break;
        case 'production':
            config = {
                port: 80,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000/download/',
                publicFolder: 'public/templates/',
                uploadFolder: 'uploads',
                awsAccessKeyId: '',
                awsSecretAccessKey: '',
                bucketname: '',
                emailFrom: 'abc@oodlestechnologies.com',
                emailPassword: '!abc@oodles',
                verificationEmailSubject: 'Welcome!'

            }
            config.roles = roles
            config.accessLevels = accessLevels
            break;
        case 'test':
            config = {
                port: 80,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000/download/',
                publicFolder: 'public/templates/',
                uploadFolder: 'uploads',
                awsAccessKeyId: '',
                awsSecretAccessKey: '',
                bucketname: '',
                emailFrom: 'abc@oodlestechnologies.com',
                emailPassword: '!abc@oodles',
                verificationEmailSubject: 'Welcome!'
            }
            config.roles = roles
            config.accessLevels = accessLevels
            break;
    }
    return config;
}

module.exports.configVariables = configVariables;
