module.exports = {
    core: {
        cluster: true,
    },
    env: {
        baseUrl: 'http://localhost:3000'
    },
    module: {
        asset: {
            additionalFiles: {
                jenericRobotoWoff: 'font/roboto-v18-cyrillic-ext_latin_cyrillic_vietnamese_greek-ext_greek_latin-ext-regular.woff',
                jenericRobotoWoff2: 'font/roboto-v18-cyrillic-ext_latin_cyrillic_vietnamese_greek-ext_greek_latin-ext-regular.woff2'
            }
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
            middleware: {
                2000: 'auth'
            },
            routes: require('./routes')
        }
    }
};
