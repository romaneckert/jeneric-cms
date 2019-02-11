const bcrypt = require('bcrypt');

class Install {

    async handle(req, res, next) {

        if (0 === await this.model.user.countDocuments()) return this.handleUserCreation(req, res, next);

        return res.redirect('/jeneric/sign-in');

    }

    async handleUserCreation(req, res, next) {
        let user = new this.model.user();
        let form = new this.component.form({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
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

