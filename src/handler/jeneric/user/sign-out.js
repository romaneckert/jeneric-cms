class SignOut {
    async handle(req, res) {

        res.clearCookie('_t');

        return res.redirect('/jeneric/user/sign-in');

    }
}

module.exports = SignOut;

