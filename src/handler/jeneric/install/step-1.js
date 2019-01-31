class Step1 {

    async handle(req, res, next) {

        let form = this.module.form.handle({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        }, req);

        if (form.submitted) {

            if (form.valid) {

                console.log(form);

                // insert to db and redirect to step-1

                let user = await this.model.user.findOne({ email: req.body.email });

                console.log(user);

            } else {

                console.log(form);

                return res.render('jeneric/install/step-1', {
                    form: form
                });
            }

        } else {
            this.model.user.countDocuments((err, count) => {
                if (err) return next(err);

                if (0 === count) {
                    return res.render('jeneric/install/step-1', {
                        form: form
                    });
                } else {
                    return res.render('jeneric/install/step-2');
                }
            });
        }
    }

}

module.exports = Step1;

