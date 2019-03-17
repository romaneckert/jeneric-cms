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
            },
            signOut: {
                path: '/jeneric/user/sign-out',
                methods: ['get'],
            }
        },
        index: {
            path: '/jeneric',
            methods: ['get', 'post'],
            roles: ['user']
        },
        install: {
            path: '/jeneric/install',
            methods: ['get', 'post'],
        }

    }
};
