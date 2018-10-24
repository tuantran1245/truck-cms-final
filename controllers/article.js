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

   /* add: (req, res) => {
        return Vehicle
            .create({
                user_id: 1,
                type: req.body.type,
                brand: req.body.brand,
                model: req.body.model,
                year: req.body.year,
                description: req.body.description,
                size: req.body.size,
                base_lenght: req.body.base_lenght,
                ground_space: req.body.ground_space,
                min_circle_radius: req.body.min_circle_radius,
                weight_total: req.body.weight_total,
                weight_self: req.body.weight_self,
                max_speed: req.body.max_speed,
                slope_capacity: req.body.slope_capacity,
                seat_number: req.body.seat_number,
                engine_name: req.body.engine_name,
                engine_type: req.body.engine_type,
                piston_volume: req.body.piston_volume,
                compress_ratio: req.body.compress_ratio,
                max_power: req.body.max_power,
                max_momen: req.body.max_momen,
                engine_position: req.body.engine_position,
                fuel_volume: req.body.fuel_volume,
                clutch: req.body.clutch,
                gear_box_type: req.body.gear_box_type,
                main_brake: req.body.main_brake,
                vice_brake: req.body.vice_brake,
                hand_brake: req.body.hand_brake,
                steer_system: req.body.steer_system,
                suspension: req.body.suspension,
                wheel_size: req.body.wheel_size,
                air_conditioner: req.body.air_conditioner,
                sight_light: req.body.sight_light,
                audio_system: req.body.audio_system,
                driver_room: req.body.driver_room,
                passenger_room: req.body.passenger_room,
                passenger_door: req.body.passenger_door,
                side_glass: req.body.side_glass,
                floor: req.body.floor,
                paint_type: req.body.paint_type,
                other_item: req.body.other_item,
            })
            .then((vehicle) => {
                return Article.create({
                    user_id: vehicle.user_id,
                    vehicle_id: vehicle.id,
                    title: req.body.title,
                    content: req.body.content
                }).then((article) => {
                    res.redirect('/articles')
                })
                .catch((error) => res.render('error', error));;
            })
            .catch((error) => res.render('error', error));
    },
    */

   add: (req, res) => {
    return Vehicle
        .create({
            user_id: 1,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            description: req.body.description,
            size: req.body.size,
            base_lenght: req.body.base_lenght,
            ground_space: req.body.ground_space,
            min_circle_radius: req.body.min_circle_radius,
            weight_total: req.body.weight_total,
            weight_self: req.body.weight_self,
            max_speed: req.body.max_speed,
            slope_capacity: req.body.slope_capacity,
            seat_number: req.body.seat_number,
            engine_name: req.body.engine_name,
            engine_type: req.body.engine_type,
            piston_volume: req.body.piston_volume,
            compress_ratio: req.body.compress_ratio,
            max_power: req.body.max_power,
            max_momen: req.body.max_momen,
            engine_position: req.body.engine_position,
            fuel_volume: req.body.fuel_volume,
            clutch: req.body.clutch,
            gear_box_type: req.body.gear_box_type,
            main_brake: req.body.main_brake,
            vice_brake: req.body.vice_brake,
            hand_brake: req.body.hand_brake,
            steer_system: req.body.steer_system,
            suspension: req.body.suspension,
            wheel_size: req.body.wheel_size,
            air_conditioner: req.body.air_conditioner,
            sight_light: req.body.sight_light,
            audio_system: req.body.audio_system,
            driver_room: req.body.driver_room,
            passenger_room: req.body.passenger_room,
            passenger_door: req.body.passenger_door,
            side_glass: req.body.side_glass,
            floor: req.body.floor,
            paint_type: req.body.paint_type,
            other_item: req.body.other_item,
            Articles: [{
                user_id: 1,
                title: req.body.title,
                content: req.body.content
            }]
        }, {
            include: [Article]
        }).then(() => {
            res.redirect('/articles')
        })
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
