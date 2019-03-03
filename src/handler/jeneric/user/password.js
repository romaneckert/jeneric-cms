const PasswordForm = require('../../../form/user/password');

class Password {

    async handle(req, res, next) {

        let user = await this.model.user.findOne({ passwordToken: req.params.passwordToken });

        if (null === user) return next();

        let form = new PasswordForm(user);

        form.handle(req.body);

        if (!form.submitted || !form.valid) {
            return res.render('jeneric/user/password', {
                form: form
            });
        }

    }

}


module.exports = Password;

