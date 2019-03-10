const Model = require('@jeneric/core/src/model');

class User extends Model {
    constructor() {

        super();

        this._schema = {
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
        };
    }

}

module.exports = User;
