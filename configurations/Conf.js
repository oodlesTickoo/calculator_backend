
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
                },
                hubspot:{
                    url:'https://api.hubapi.com',
                    hapikey: 'a359482e-a30d-42c1-bcf2-fcc727eb50fe'
                }

            };
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
            break;
    }
    return config;
}

module.exports.configVariables = configVariables;
