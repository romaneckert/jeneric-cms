const PasswordForm = require('../../../form/user/password');
const bcrypt = require('bcrypt');

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

        // generate password
        try {
            user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {
            form.addError('password', 'jeneric.error.data_process');
            this.logger.error('can not generate password for user', err);

            return res.render('jeneric/user/password', {
                form: form
            });
        }

        // remove passwordToken
        user.passwordToken = undefined;

        // add password creation date
        user.passwordCreationDate = new Date();

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            this.logger.error('can not save user', err);

            return res.render('jeneric/user/password', {
                form: form
            });
        }

        res.redirect('/jeneric/sign-in');
    }

}


module.exports = Password;

