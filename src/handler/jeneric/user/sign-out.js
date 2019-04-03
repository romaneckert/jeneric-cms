module.exports = class SignOut {
    async handle(req, res) {

        jeneric.module.auth.signOut(req, res);

        return res.redirect('/jeneric/user/sign-in');

    }
}

