class Index {

    async handle(req, res, next) {
        return res.render('jeneric/index');
    }

}

module.exports = Index;

