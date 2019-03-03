const Form = require('@jeneric/core/src/form')

class SignInForm extends Form {

    constructor(user) {

        super({
            email: {
                type: String,
                validate: require('../../validator/email')
            },
            password: {
                type: String,
                required: [true, 'jeneric.error.password.required']
            }
        }, user);
    }

}

module.exports = SignInForm;
