module.exports = {
    jeneric: {
        install: {
            path: '/jeneric/install',
            methods: 'get',
            handler: 'jeneric/install/install'
        },
        step: {
            path: '/jeneric/install/step-1',
            methods: 'get,post',
            handler: 'jeneric/install/step1'
        },
        login: {
            path: '/jeneric/sign-in',
            methods: 'get,post',
            handler: 'jeneric/signIn'
        }
    }
};
