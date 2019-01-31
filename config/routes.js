module.exports = {
    jeneric: {
        install: {
            path: '/jeneric/install',
            methods: 'get',
            handler: 'jeneric/install/install'
        },
        step1: {
            path: '/jeneric/install/step-1',
            methods: 'get,post',
            handler: 'jeneric/install/step1'
        },
        step2: {
            path: '/jeneric/install/step-2',
            methods: 'get,post',
            handler: 'jeneric/install/step2'
        },
        login: {
            path: '/jeneric/sign-in',
            methods: 'get,post',
            handler: 'jeneric/signIn'
        }
    }
};
