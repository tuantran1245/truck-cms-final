const Article = require('../models').Article;
const Vehicle = require('../models').Vehicle;

module.exports = {
    list: (req, res) => {
        return Article
            .findAll()
            .then((articles) => {
                res.render('article/index', { articles: articles });
            })
            .catch((error) => { res.render('error', error); });
    },

    getById: async (req, res) => {
        try {
            let article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send({
                    message: 'Article Not Found',
                });
            }
            let vehicle = await Vehicle.findOne({
                where: {user_id: article.user_id}
            })
            if (!vehicle) {
                return res.status(404).send({
                    message: 'Vehicle Not Found',
                });
            }
            res.render('article/show', { article: article, vehicle: vehicle });
        } catch (error) {
            res.render('error', error);
        }


        // return Article
        // 	.findById(req.params.id)
        // 	.then((article) => {
        // 		if (!article) {
        // 			return res.status(404).send({
        // 				message: 'Article Not Found',
        // 			});
        //         }
        //       
        // 		res.render('article/show', { article: article })
        // 	})
        // 	.catch((error) => res.render('error', error));
    },

    add: (req, res) => {
        return Article
            .create({
                full_name: req.body.full_name,
                email: req.body.email,
                dob: req.body.dob,
                phone: req.body.phone,
                address: req.body.address,
                identity_number: req.body.identity_number,
                license_number: req.body.license_number
            })
            .then((article) => res.redirect('/articles'))
            .catch((error) => res.render('error', error));
    },

    edit: (req, res) => {
        return Article
            .findById(req.params.id)
            .then((article) => {
                if (!article) {
                    return res.status(404).send({
                        message: 'Article Not Found',
                    });
                }
                res.render('article/edit', { article: article })
            })
            .catch((error) => res.render('error', error));
    },

    update: async (req, res) => {
        return Article
            .findById(req.params.id)
            .then(article => {
                if (!article) {
                    return res.status(404).send({
                        message: 'Article Not Found',
                    });
                }
                return article
                    .update({
                        full_name: req.body.full_name,
                        email: req.body.email,
                        dob: req.body.dob,
                        phone: req.body.phone,
                        address: req.body.address,
                        identity_number: req.body.identity_number,
                        license_number: req.body.license_number
                    })
                    .then(() => res.status(200).send(article))
                    .catch((error) => res.render('error', error));
            })
            .catch((error) => res.render('error', error));
    },

    delete: (req, res) => {
        return Article.findById(req.params.id)
            .then(article => {
                if (!article) {
                    return res.status(400).send({
                        message: 'Article Not Found',
                    });
                }
                return Article.destroy({
                    where: {
                        id: article.id
                    }
                }).then(() => {
                    res.redirect('/articles')
                }).catch((err) => {
                    res.render('error', err)
                })
            })
            .catch((error) => res.render('error', error));
    },
};
