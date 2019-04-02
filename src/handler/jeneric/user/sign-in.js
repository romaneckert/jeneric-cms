const SignInForm = require('../../../form/user/sign-in');
const bcrypt = require('bcrypt');

module.exports = class SignIn {

    async handle(req, res, next) {

        let form = new SignInForm();

        form.handle(req.body);

        if (!form.valid) {
            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        let user = null;

        try {
            user = await jeneric.model.user.findOne({ email: form.data.email });
        } catch (err) {

            jeneric.logger.error('can not find user', err);
            form.addError('user', 'jeneric.error.data_process');

            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        if (null === user) {

            form.addError('user', 'jeneric.error.user.incorrect_username_or_password');

            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        if (!bcrypt.compareSync(form.data.password, user.password)) {

            form.addError('user', 'jeneric.error.user.incorrect_username_or_password');

            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        // generate token
        let token = jeneric.module.auth.generateToken(user);

        if (token === null) {
            jeneric.logger.error('can not generate token', err);
            form.addError('user', 'jeneric.error.data_process');

            return res.render('jeneric/user/sign-in', {
                form: form
            });
        }

        // add token to response
        jeneric.module.auth.addTokenToResponse(token, res);

        return res.redirect('/jeneric');

    }

}

