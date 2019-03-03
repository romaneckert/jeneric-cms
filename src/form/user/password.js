const Form = require('@jeneric/core/src/form')

class PasswordForm extends Form {

    constructor(instance) {

        super({
            password: {
                type: String,
                validate: [
                    {
                        validator: (password) => {
                            return /\d/.test(password);
                        },
                        message: 'jeneric.error.password.one_number_required'
                    },
                    {
                        validator: (password) => {
                            return /[a-zA-ZöäüÖÜA]/.test(password);
                        },
                        message: 'jeneric.error.password.one_letter_required'
                    },
                    {
                        validator: (password) => {
                            return /[\@\^\#\(\)\[\]\{\}\?\!\$\%\&\/\=\*\+\~\,\.\;\:\<\>\-\_]/.test(password);
                        },
                        message: 'jeneric.error.password.one_special_char_required'
                    },
                    {
                        validator: (password) => {
                            return password.length > 7;
                        },
                        message: 'jeneric.error.password.min_length_8'
                    },
                    {
                        validator: (password) => {
                            return password.length < 101;
                        },
                        message: 'jeneric.error.password.max_length_100'
                    },
                    {
                        validator: (password) => {

                            for (let char of password) {
                                if (-1 === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäÖÜÄ0123456789@^#()[]{}?!$%&/=*+~,.;:<>-_'.split('').indexOf(char)) return false;
                            }

                            return true;
                        },
                        message: 'jeneric.error.password.illegal_characters'
                    }
                ],
            }
        }, instance);
    }

}

module.exports = PasswordForm;
