
var configVariables = function() {
    var config;
    switch (process.env.NODE_ENV) {
        case 'development':
            config = {
                port: 3000,
                host: 'http://180.151.85.194:3000:/',
                verificationUrl: 'http://180.151.85.194:3000:/verify/',
                downloadUrl: 'http://180.151.85.194:3000:/download/',
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
                    url: 'https://api.hubapi.com',
                    hapikey: 'a359482e-a30d-42c1-bcf2-fcc727eb50fe',
                    folder: 'dev_files',
                    file_url: 'https://cdn2.hubspot.net/hub'
                }

            };
            break;
        case 'staging':
            config = {
                port: 3000,
                host: 'http://180.151.85.194:3000:3000/',
                verificationUrl: 'http://180.151.85.194:3000:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000:3000/download/',
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
                    url: 'https://api.hubapi.com',
                    hapikey: 'a359482e-a30d-42c1-bcf2-fcc727eb50fe',
                    folder: 'dev_files',
                    file_url: 'https://cdn2.hubspot.net/hub'
                }

            };
            break;
        case 'production':
            config = {
                port: 3000,
                host: 'http://180.151.85.194:3000:3000/',
                verificationUrl: 'http://180.151.85.194:3000:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000:3000/download/',
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
                    url: 'https://api.hubapi.com',
                    hapikey: 'a359482e-a30d-42c1-bcf2-fcc727eb50fe',
                    folder: 'dev_files',
                    file_url: 'https://cdn2.hubspot.net/hub'
                }

            };
            break;
        case 'test':
            config = {
                port: 3000,
                host: 'http://180.151.85.194:3000:3000/',
                verificationUrl: 'http://180.151.85.194:3000:3000/verify/',
                downloadUrl: 'http://180.151.85.194:3000:3000/download/',
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
                    url: 'https://api.hubapi.com',
                    hapikey: 'a359482e-a30d-42c1-bcf2-fcc727eb50fe',
                    folder: 'dev_files',
                    file_url: 'https://cdn2.hubspot.net/hub'
                }

            };
            break;
            break;
    }
    return config;
}

module.exports.configVariables = configVariables;
