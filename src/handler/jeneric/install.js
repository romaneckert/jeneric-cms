const bcrypt = require('bcrypt');
const crypto = require('crypto');
const EmailForm = require('../../form/user/email');

class Install {

    async handle(req, res, next) {

        if (0 < await this.model.user.countDocuments()) res.redirect('/jeneric/sign-in');

        let user = new this.model.user();
        let form = new EmailForm(user);

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

            this.logger.error('user with email already exists', err);

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // generate password token
        try {

            let passwordToken = crypto.randomBytes(32).toString('hex');

            if (0 < await this.model.user.countDocuments({ passwordToken: passwordToken })) throw new Error();

            user.passwordToken = passwordToken;

        } catch (err) {

            form.addError('password', 'jeneric.error.data_process');
            this.logger.error('can not generate password token for user', err);

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

            let verificationLink = 'https://test.jeneric/';

            let html = await this.module.mail.render(
                'jeneric/user/email/verify',
                { verificationLink: verificationLink },
                res
            );

            await this.module.mail.send({
                to: user.email,
                subject: res.trans('jeneric.user.email.confirm.subject'),
                html: html
            });

            return res.render('jeneric/install/user-creation-success', {
                form: form
            });

        } catch (err) {
            form.addError('user', 'jeneric.error.send_email');
            this.logger.error('can not send email to user', err);
        }

        // remove user instance, because email send failed
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

