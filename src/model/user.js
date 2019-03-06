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
            passwordToken: {
                type: String
            },
            passwordCreationDate: {
                type: Date
            }
        };

    }

}

module.exports = User;
