const mongoose = require('mongoose');

class User {
    constructor() {

        const schema = new mongoose.Schema({
            email: {
                type: String,
                validate: require('../validator/email')
            },
            passwordHash: {
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

        return mongoose.model(this.constructor.name, schema);

    }
}

module.exports = User;
