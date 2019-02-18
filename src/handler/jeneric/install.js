const bcrypt = require('bcrypt');

class Install {

    async handle(req, res, next) {

        if (0 === await this.model.user.countDocuments()) return this.handleUserCreation(req, res, next);

        return res.redirect('/jeneric/sign-in');

    }

    async handleUserCreation(req, res, next) {

        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

        let user = new this.model.user();
        let form = new this.component.form({
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
            },
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

                            let allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäÖÜÄ0123456789@^#()[]{}?!$%&/=*+~,.;:<>-_'.split('');

                            for (let char of password) {

                                if (-1 === allowedChars.indexOf(char)) {
                                    return false;
                                }
                            }

                            return true;
                        },
                        message: 'jeneric.error.password.illegal_characters'
                    }
                ],

            }
        }, user);

        form.handle(req.body);

        if (!form.submitted || !form.valid) {
            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // check if user with email already exists
        try {
            if (null !== await this.model.user.findOne({ email: user.email })) {
                return res.redirect('/jeneric/install');
            }
        } catch (err) {

            this.logger.error(err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // generate password and save user
        try {
            user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {

            form.addError('password', 'jeneric.error.data_process');
            this.logger.error('can not generate password for user', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            this.logger.error('can not save user', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // send email with confirm token
        try {

            let html = await this.module.mail.render('jeneric/user/email/verify', user, res);

            await this.module.mail.send({
                to: user.email,
                subject: res.trans('jeneric.user.email.confirm.subject'),
                html: html
            });

            return res.redirect('/jeneric/install');
        } catch (err) {
            form.addError('user', 'jeneric.error.send_email');
            this.logger.error('can not send email to user', err);
        }

        // remove model, because email send failed
        try {
            await user.remove();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            this.logger.error('can not delete user', err);
        }

        return res.render('jeneric/install/user-creation', {
            form: form
        });

    }

}

module.exports = Install;

