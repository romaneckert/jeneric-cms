module.exports = {

    middleware: {
        roles: {
            redirectPath: '/jeneric/user/sign-in'
        }
    },
    module: {
        core: {
            cluster: true,
            secret: 'asdjkjkasd734q5fkasklasdf',
            baseUrl: 'https://localhost:3000'
        },
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
