let bcrypt = require('bcrypt');

class Login {

    handle(req, res, next) {

        if (req.body.email) {
            return res.render('jeneric/sign-in');
        }

        this.model.user.count((err, count) => {
            if (err) return next(err);

            if (0 === count) {
                return res.render('jeneric/install');
            }
        });

    }

}

module.exports = Login;

