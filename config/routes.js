module.exports = {
    jeneric: {
        user: {
            password: {
                path: '/jeneric/user/password/:passwordToken',
                methods: ['get', 'post'],
            },
            passwordReset: {
                path: '/jeneric/user/password-reset',
                methods: ['get', 'post'],
            },
            signIn: {
                path: '/jeneric/user/sign-in',
                methods: ['get', 'post'],
            }
        },
        index: {
            path: '/jeneric',
            methods: ['get', 'post'],
        },
        install: {
            path: '/jeneric/install',
            methods: ['get', 'post'],
        }

    }
};
