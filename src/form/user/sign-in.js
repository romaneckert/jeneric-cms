const Form = require('@jeneric/core/src/form')

class SignInForm extends Form {

    constructor() {

        super({
            email: {
                type: String,
                validate: require('../../validator/email')
            },
            password: {
                type: String,
                required: [true, 'jeneric.error.password.required']
            }
        });
    }

}

module.exports = SignInForm;
