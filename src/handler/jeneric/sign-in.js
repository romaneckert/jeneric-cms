let bcrypt = require('bcrypt');

class Login {

    async handle(req, res, next) {

        if (0 === await this.model.user.countDocuments({ emailVerificationDate: { $exists: true } })) return res.redirect('/jeneric/install');

        let form = new this.component.form({
            email: {
                type: String,
                validate: [
                    {
                        validator: (email) => {
                            return /\S+@\S+\.\S+/.test(email);
                        },
                        message: 'jeneric.error.email.not_valid'
                    },
                ]
            },
            password: {
                type: String,
                required: [true, 'jeneric.error.password.required']
            }
        });

        form.handle(req.body);

        if (!form.submitted || !form.valid) {
            return res.render('jeneric/sign-in', {
                form: form
            });
        }

        this.model.user.findOne({ email: req.body.email }, (err, user) => {
            if (err) return next(err);

            if (null === user) {
                return res.render('jeneric/sign-in', {
                    errors: ['can not login, wrong credentials']
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return next(err);

                core.service.accessToken.addCookie(user, res);

                return res.redirect('/user/overview/');

            });

        });

    }

}

module.exports = Login;

