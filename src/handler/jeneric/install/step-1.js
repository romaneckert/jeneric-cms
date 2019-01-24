class Step1 {

    async handle(req, res, next) {

        if (!req.body.email) {

            let user = await this.model.user.findOne({ email: req.body.email });

            console.log(user);

        } else {
            this.model.user.countDocuments((err, count) => {
                if (err) return next(err);

                if (0 === count) {
                    return res.render('jeneric/install/step-1');
                }
            });
        }
    }

}

module.exports = Step1;

