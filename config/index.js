module.exports = {
    model: {
        user: {
            schema: {
                email: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                passwordToken: {
                    type: String
                }
            }
        }
    },
    module: {
        i18n: {
            locales: ['en', 'de_DE', 'de'],
            defaultLocale: ['en'],
        },
        mail: {
            url: 'smtp://localhost:1025'
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
