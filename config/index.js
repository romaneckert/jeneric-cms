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
                }
            }
        }
    },
    module: {
        server: {
            middleware: {
                2000: 'auth'
            },
            routes: require('./routes')
        }
    }
};
