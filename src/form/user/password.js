const Form = require('@jeneric/core/src/form')

class PasswordForm extends Form {

    constructor(user) {

        super({
            password: {
                type: String,
                validate: require('../../validator/password'),
            },
            passwordRepeat: {
                type: String,
                validate: require('../../validator/password-repeat'),
            }
        }, user);
    }

}

module.exports = PasswordForm;
