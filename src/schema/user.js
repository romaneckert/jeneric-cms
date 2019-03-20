const mongoose = require('mongoose');

module.exports = class User {
    constructor() {

        return new mongoose.Schema({
            email: {
                type: String,
                validate: require('../validator/email')
            },
            password: {
                type: String
            },
            passwordCreationDate: {
                type: Date
            },
            passwordToken: {
                type: String
            },
            passwordTokenCreationDate: {
                type: Date
            },
            roles: {
                type: Array
            }
        }, { versionKey: false });

    }
}
