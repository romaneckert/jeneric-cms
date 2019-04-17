module.exports = {
    "jeneric/user/password": {
        methods: ['get', 'post'],
        path: '/jeneric/user/password/:passwordToken'
    },
    "jeneric/user/password-reset": {
        methods: ['get', 'post']
    },
    "jeneric/user/sign-in": {
        methods: ['get', 'post']
    },
    "jeneric/user/sign-out": {},
    "jeneric": {
        methods: ['get', 'post'],
        roles: ['user']
    },
    "jeneric/install": {
        methods: ['get', 'post']
    }
};
