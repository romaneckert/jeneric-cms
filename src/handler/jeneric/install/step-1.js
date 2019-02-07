//const bcrypt = require('bcrypt');

class Step1 {

    async handle(req, res, next) {

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
        });

        form.handle(req.body);

        if (!form.submitted) {
            if (0 === await this.model.user.countDocuments()) {
                return res.render('jeneric/install/step-1', {
                    form: form
                });
            }

            return res.redirect('/jeneric/install/step-2');
        }

        if (!form.valid) {
            return res.render('jeneric/install/step-1', {
                form: form
            });
        }

        // check if user with email already exists
        try {
            if (null !== await this.model.user.findOne({ email: form.instance.email })) {
                return res.redirect('/jeneric/install/step-2');
            }
        } catch (err) {

            form.addError('can not find user with email');

            return res.render('jeneric/install/step-1', {
                form: form
            });
        }

        // generate password and save user
        try {
            user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {
            form.addError('password', 'can not generate password for user');
            this.logger.error(err);

            return res.render('jeneric/install/step-1', {
                form: form
            });
        }

        user = await form.instance.save();

        // send email with confirm token

        if (await this.module.user.sendEmailConfirm(user, res)) {
            return res.redirect('/jeneric/install/step-2');
        }

        return res.render('jeneric/install/step-1', {
            form: form
        });

    }

}

module.exports = Step1;

