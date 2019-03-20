const Form = require('@jeneric/core/src/form')

module.exports = class PasswordForm extends Form {

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
