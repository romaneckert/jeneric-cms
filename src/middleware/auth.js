const jwt = require('jsonwebtoken');

class Auth {

    handle(req, res, next) {

        try {

            if ('string' !== typeof req.cookies._t) next();

            let decoded = jwt.verify(req.cookies._t, this.container.config.core.secret);

            if ('object' === typeof decoded.data.user && null !== decoded.data.user) {
                req.user = decoded.data.user;
            }



        } catch (err) {
            this.logger.error('error in auth module', err);
        }

        next();
    }

}

module.exports = Auth;

