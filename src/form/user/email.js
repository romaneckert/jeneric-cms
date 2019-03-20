const Form = require('@jeneric/core/src/form')

module.exports = class EmailForm extends Form {

    constructor(user) {

        super({
            email: {
                type: String,
                validate: require('../../validator/email')
            }
        }, user);
    }

}
