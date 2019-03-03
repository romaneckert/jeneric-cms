const Form = require('@jeneric/core/src/form')

class PasswordForm extends Form {

    constructor(user) {

        super({
            password: {
                type: String,
                validate: require('../../validator/password'),
            }
        }, user);
    }

}

module.exports = PasswordForm;
