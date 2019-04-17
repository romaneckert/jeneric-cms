module.exports = {
    app: {
        cluster: true,
        baseUrl: 'https://localhost:3000'
    },
    auth: {
        redirectPath: '/jeneric/user/sign-in'
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
};
