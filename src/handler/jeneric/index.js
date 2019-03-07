class Index {

    async handle(req, res, next) {

        if (0 === await this.model.user.countDocuments()) return res.redirect('/jeneric/install');

        return res.redirect('/jeneric/user/sign-in');

    }

}

module.exports = Index;

