const Model = require('@jeneric/core/src/model');

class User extends Model {
    constructor() {

        super();

        this._schema = {
            email: {
                type: String,
                validate: require('../validator/email')
            },
            emailVerificationDate: {
                type: Date
            },
            password: {
                type: String
            },
            passwordToken: {
                type: String
            }
        };

    }

}

module.exports = User;
