const PasswordForm = require('../../../form/user/password');
const bcrypt = require('bcrypt');
const app = require('@jeneric/app');

class Password {

    async handle(req, res, next) {

        let user = await app.model.user.findOne({ passwordToken: req.params.passwordToken });

        // return password token expired after 24h
        if (null === user || new Date() - user.passwordTokenCreationDate > 24 * 60 * 60 * 1000) {
            return res.render('jeneric/user/password-token-expired');
        }

        // create password form
        let form = new PasswordForm(user);

        form.handle(req.body);

        if (!form.valid) {
            return res.render('jeneric/user/password', {
                form: form
            });
        }

        // generate password
        try {
            user.password = bcrypt.hashSync(user.password, 10);
        } catch (err) {
            form.addError('password', 'jeneric.error.data_process');
            app.logger.error('can not generate password for user', err);

            return res.render('jeneric/user/password', {
                form: form
            });
        }

        // remove password token
        user.passwordToken = undefined;

        // remove password token creation date
        user.passwordTokenCreationDate = undefined;

        // add password creation date
        user.passwordCreationDate = new Date();

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            jeneric.logger.error('can not save user', err);

            return res.render('jeneric/user/password', {
                form: form
            });
        }

        return res.render('jeneric/user/password-success', {
            form: form
        });
    }

}

module.exports = Password;
