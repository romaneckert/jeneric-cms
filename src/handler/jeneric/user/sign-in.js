const jwt = require('jsonwebtoken');
const SignInForm = require('../../../form/user/sign-in');

class SignIn {

    async handle(req, res, next) {

        if (0 === await this.model.user.countDocuments()) return res.redirect('/jeneric/install');

        let form = new SignInForm();

        form.handle(req.body);

        if (!form.valid) {
            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        let user = await this.model.user.findOne({ email: form.data.email });

        if (null === user) {

            form.addError('user', 'jeneric.error.user.incorrect_username_or_password');

            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        let token = jwt.sign(
            {
                data: {
                    user: {
                        email: user.email,
                        role: user.role
                    }
                }
            },
            this.container.config.core.secret,
            {
                expiresIn: this.container.config.core.userTokenExpires
            }
        );

        res.cookie('_t', token, {
            expires: new Date(Date.now() + this.container.config.core.userTokenExpires * 1000),
            httpOnly: true,
            sameSite: 'Strict',
            secure: true
        });

        return res.redirect('/jeneric');

    }

}

module.exports = SignIn;

