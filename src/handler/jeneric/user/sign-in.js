let bcrypt = require('bcrypt');
const SignInForm = require('../../../form/user/sign-in');

class Login {

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

        /*
        this.model.user.findOne({ email: req.body.email }, (err, user) => {
            if (err) return next(err);

            if (null === user) {
                return res.render('jeneric/user/sign-in', {
                    errors: ['can not login, wrong credentials']
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return next(err);

                core.service.accessToken.addCookie(user, res);

                return res.redirect('/user/overview/');

            });

        });*/

    }

}

module.exports = Login;

