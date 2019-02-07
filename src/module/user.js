class User {

    async sendEmailConfirm(user, res) {

        let html = await this.module.mail.render('jeneric/user/email/verify', user, res);

        return await this.module.mail.send({
            to: user.email,
            subject: res.trans('jeneric.cms.user.email.confirm.subject'),
            html: html
        });

    }

}

module.exports = User;
