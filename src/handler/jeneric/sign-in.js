let bcrypt = require('bcrypt');

class Login {

    handle(req, res, next) {

        if (!req.body.email) {
            return res.render('jeneric/sign-in');
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

