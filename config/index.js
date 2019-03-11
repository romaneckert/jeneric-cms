module.exports = {
    core: {
        cluster: true,
        secret: 'asdjkjkasd734q5fkasklasdf',
        userTokenExpires: 86400
    },
    env: {
        baseUrl: 'https://localhost:3000'
    },
    middleware: {
        roles: {
            routes: require('./routes'),
            redirectPath: '/jeneric/user/sign-in'
        }
    },
    module: {
        i18n: {
            locales: ['en', 'de_DE', 'de'],
            defaultLocale: ['en'],
        },
        mail: {
            url: 'smtp://localhost:1025/'
        },
        mongoose: {
            url: 'mongodb://localhost/jeneric-cms'
        },
        server: {
            routes: require('./routes')
        }
    }
};
