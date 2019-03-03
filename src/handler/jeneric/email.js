class Email {

    async handle(req, res, next) {

        return res.render('jeneric/user/email/verify');

    }
}

module.exports = Email;
