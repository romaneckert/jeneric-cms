const Model = require('@jeneric/core/src/model');

class User extends Model {
    constructor() {

        super();

        this._schema = {
            email: {
                type: String,
                required: true
            },
            emailVerificationDate: {
                type: Date
            },
            password: {
                type: String,
            }
        };
    }

}

module.exports = User;
