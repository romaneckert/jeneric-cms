const crypto = require('crypto');
const EmailForm = require('../../form/user/email');
const app = require('@jeneric/app');

class Install {

    async handle(req, res, next) {

        if (0 < await app.model.user.countDocuments()) {
            return res.redirect('/jeneric/user/sign-in');
        }

        let user = new app.model.user();
        let form = new EmailForm(user);

        form.handle(req.body);

        if (!form.valid) {
            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // check if user with email already exists
        try {
            if (null !== await app.model.user.findOne({email: user.email})) {
                return res.redirect('/jeneric/install');
            }
        } catch (err) {

            app.logger.error('user with email already exists', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // generate password token
        try {

            let passwordToken = crypto.randomBytes(32).toString('hex');

            if (0 < await app.model.user.countDocuments({passwordToken: passwordToken})) throw new Error();

            user.passwordToken = passwordToken;
            user.passwordTokenCreationDate = new Date();

        } catch (err) {

            form.addError('password', 'jeneric.error.data_process');
            app.logger.error('can not generate password token for user', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // add user role
        user.roles = ['admin', 'user'];

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            app.logger.error('can not save user', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // send email with confirm token
        try {

            let html = await jeneric.module.mail.render(
                'jeneric/user/email/set-password',
                {
                    user: user
                },
                res
            );

            await app.module.mail.send({
                to: user.email,
                subject: app.module.i18n.translate(res.locale, 'jeneric.user.email.password.subject'),
                html: html
            });

            return res.render('jeneric/install/user-creation-success');

        } catch (err) {
            form.addError('user', 'jeneric.error.send_email');
            app.logger.error('can not send email to user', err);
        }

        // remove user instance, because email send failed
        try {
            await user.remove();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            app.logger.error('can not delete user', err);
        }

        return res.render('jeneric/install/user-creation', {
            form: form
        });

    }

}

module.exports = Install;

