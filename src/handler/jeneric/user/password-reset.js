const EmailForm = require('../../../form/user/email');
const crypto = require('crypto');

module.exports = class PasswordReset {

    async handle(req, res, next) {

        let user = new this.model.user();
        let form = new EmailForm(user);

        form.handle(req.body);

        if (!form.valid) {
            return res.render('jeneric/user/password-reset', {
                form: form
            });
        }

        user = await this.model.user.findOne({ email: user.email });

        if (null === user) {
            return res.render('jeneric/user/password-reset-success');
        }

        // generate password token
        try {

            let passwordToken = crypto.randomBytes(32).toString('hex');

            if (0 < await this.model.user.countDocuments({ passwordToken: passwordToken })) throw new Error();

            user.passwordToken = passwordToken;
            user.passwordTokenCreationDate = new Date();

        } catch (err) {

            form.addError('password', 'jeneric.error.data_process');
            this.logger.error('can not generate password token for user', err);

            return res.render('jeneric/user/password-reset', {
                form: form
            });
        }

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'jeneric.error.data_process');
            this.logger.error('can not save user', err);

            return res.render('jeneric/user/password-reset', {
                form: form
            });
        }

        // send email with confirm token
        try {

            let html = await this.module.mail.render(
                'jeneric/user/email/set-password',
                {
                    user: user
                },
                res
            );

            await this.module.mail.send({
                to: user.email,
                subject: res.trans('jeneric.user.email.confirm.subject'),
                html: html
            });

            return res.render('jeneric/user/password-reset-success');

        } catch (err) {
            form.addError('user', 'jeneric.error.send_email');
            this.logger.error('can not send email to user', err);
        }

        return res.render('jeneric/user/password-reset', {
            form: form
        });

    }

}
