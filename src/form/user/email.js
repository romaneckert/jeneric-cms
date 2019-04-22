const Form = require('@jeneric/core/src/form')

class EmailForm extends Form {

    constructor(user) {

        super({
            email: {
                type: String,
                validate: require('../../validator/email')
            }
        }, user);
    }

}

module.exports = EmailForm;
