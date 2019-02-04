class Step1 {

    async handle(req, res, next) {

        let user = new this.model.user();

        let form = this.module.form.handle(user, req.body);

        if (form.submitted) {

            if (form.valid) {

                // check if user with email already exists
                try {
                    if (null !== await this.model.user.findOne({ email: form.instance.email })) {
                        return res.redirect('/jeneric/install/step-2');
                    }
                } catch (err) {
                    return res.render('jeneric/install/step-1', {
                        form: form
                    });
                }

                try {
                    user = await form.instance.save();
                } catch (err) {
                    return res.render('jeneric/install/step-1', {
                        form: form
                    });
                }

                this.module.mail.send({
                    to: user.email,
                    subject: 'Please verify your email',
                    html: res.render('/jeneric/user/email/verify')
                }, (err) => {
                    if (err) {
                        this.logger.error('can not send email to user', err);
                    }
                });

                return res.redirect('/jeneric/install/step-2');

            } else {

                return res.render('jeneric/install/step-1', {
                    form: form
                });
            }

        } else {

            if (0 === await this.model.user.countDocuments()) {
                return res.render('jeneric/install/step-1', {
                    form: form
                });
            }

            return res.redirect('/jeneric/install/step-2');
        }
    }

}

module.exports = Step1;

