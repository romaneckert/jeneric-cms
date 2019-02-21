class Password {

    async handle(req, res, next) {

        let user = await this.model.user.findOne({ passwordToken: req.params.passwordToken });

        if (null === user) return next();

        let form = new this.component.form({
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
        });

        form.handle(req.body);

        if (!form.submitted || !form.valid) {
            return res.render('jeneric/user/password', {
                form: form
            });
        }

    }

}


module.exports = Password;

