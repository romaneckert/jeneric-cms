module.exports = {
    jeneric: {
        user: {
            password: {
                path: '/jeneric/user/password/:passwordToken',
                methods: 'get,post',
                handler: 'jeneric/user/password'
            }
        },
        jeneric: {
            path: '/jeneric',
            methods: 'get,post',
            handler: 'jeneric/index'
        },
        install: {
            path: '/jeneric/install',
            methods: 'get,post',
            handler: 'jeneric/install'
        },
        login: {
            path: '/jeneric/sign-in',
            methods: 'get,post',
            handler: 'jeneric/signIn'
        }
    }
};
