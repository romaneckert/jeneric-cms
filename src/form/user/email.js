const Form = require('@jeneric/core/src/form')

class EmailForm extends Form {

    constructor(instance) {

        super({
            email: {
                type: String,
                validate: [
                    {
                        validator: (email) => {
                            return /\S+@\S+\.\S+/.test(email);
                        },
                        message: 'jeneric.error.email.not_valid'
                    },
                ]
            }
        }, instance);
    }

}

module.exports = EmailForm;
