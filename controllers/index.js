const Article = require('../models').Article;
const Vehicle = require('../models').Vehicle;
const Image = require('../models').Image;

module.exports = {
    index: async (req, res) => {
        //res.render('index', { title: 'Express' });

        try {
            let vehicleWithImg = [];
            let vehicles = await Vehicle.findAll();
            if (!vehicles) {
                return res.status(404).send({
                    message: 'Vehicle Not Found',
                });
            }
            for (var i = 0; i < vehicles.length; i++) {
                let article = await Article.findOne({
                    where: {
                        vehicle_id: vehicles[i].id
                    }
                });
                let images = await Image.findAll({
                    where: {
                        article_id: article.id
                    }
                });
                if (images) {
                    vehicleWithImg.push ({
                        key: vehicles[i],
                        value: images
                    });
                }
            }
            console.log("done loading vehicles");
            //res.render('index', { title: "test page" });
            //res.render('toyota/index', { vehicleWithImg: vehicleWithImg });
        } catch (error) {
            res.render('error', error);
        }
         
    }
}