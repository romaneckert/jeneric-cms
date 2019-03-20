module.exports = {
    jeneric_user_password: {
        path: '/jeneric/user/password/:passwordToken',
        methods: ['get', 'post'],
    },
    jeneric_user_password_reset: {
        path: '/jeneric/user/password-reset',
        methods: ['get', 'post'],
    },
    jeneric_user_sign_in: {
        path: '/jeneric/user/sign-in',
        methods: ['get', 'post'],
    },
    jeneric_user_sign_out: {
        path: '/jeneric/user/sign-out',
        methods: ['get'],
    },
    jeneric_index: {
        path: '/jeneric',
        methods: ['get', 'post'],
        roles: ['user']
    },
    jeneric_install: {
        path: '/jeneric/install',
        methods: ['get', 'post'],
    }
};
