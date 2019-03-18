const mongoose = require('mongoose');

class User {
    constructor() {

        let schema = new mongoose.Schema({
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

        return new mongoose.model(this.constructor.name, schema);
    }

}

module.exports = User;
