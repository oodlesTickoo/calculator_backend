module.exports = {

    USER_ROLE: {
        'ADVISOR': 'ADVISOR',
        'CLIENT': 'CLIENT',
        'ADMINISTRATOR': 'ADMINISTRATOR'
    },

    ROUTE_ACCESS: {
        'ANONYMOUS': ['CLIENT', 'ADVISOR', 'ADMINISTRATOR'],
        'CLIENT': ['CLIENT', 'ADVISOR', 'ADMINISTRATOR'],
        'ADMINISTRATOR': ['ADMINISTRATOR'],
        'ADVISOR': ['ADVISOR', 'ADMINISTRATOR'],

    },
    ROUTE_ACCESS_ROLE: {
        'ANONYMOUS': 'ANONYMOUS',
        'CLIENT': 'CLIENT',
        'ADMINISTRATOR': 'ADMINISTRATOR',
        'ADVISOR': 'ADVISOR'
    },
    AUTH_HEADER: 'Authorization',

    HUBSPOT_URL: {
        CONTACT: '/contacts/v1/contact/',
        EMAIL_SEARCH: '/contacts/v1/contact/emails/batch/',
        FILE: '/filemanager/api/v2/files',
        QUERY_SEARCH: '/contacts/v1/search/query'

    },
    HUBSPOT: {
        FOLDER_NAME: 'demo'
    }
};