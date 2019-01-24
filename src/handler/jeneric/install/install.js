class Install {

    handle(req, res) {

        return res.redirect(301, '/jeneric/install/step-1');

    }

}

module.exports = Install;
