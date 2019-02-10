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

            form.addError('password', 'can not generate password for user');

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // save user
        try {
            await user.save();
        } catch (err) {
            form.addError('user', 'can not save user');

            return res.render('jeneric/install/user-creation', {
                form: form
            });
        }

        // send email with confirm token
        if (await this.module.user.sendEmailConfirm(user, res)) {
            return res.redirect('/jeneric/install');
        }

        form.addError('user', 'can not send email to user');

        // TODO: add delete user

        return res.render('jeneric/install/user-creation', {
            form: form
        });

    }

}

module.exports = Install;

