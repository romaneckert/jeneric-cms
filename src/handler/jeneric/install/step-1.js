class Step1 {

    handle(req, res, next) {

        if (!req.body.email) {

            this.model.user.findOne({ email: req.body.email }, this.handleFindUser);

        } else {
            this.model.user.countDocuments((err, count) => {
                if (err) return next(err);

                if (0 === count) {
                    return res.render('jeneric/install/step-1');
                }
            });
        }
    }

    handleFindUser(err, user) {

        if (err) return next(err);

        if (null !== user) {
            return res.render('jeneric/sign-in', {
                errors: ['user already exists']
            });
        } else {
            // create user
        }

    }

}

module.exports = Step1;

