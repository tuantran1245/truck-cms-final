const Article = require('../models').Article;
const Vehicle = require('../models').Vehicle;
const Image = require('../models').Image;
const fs = require('fs');
const to = require('await-to-js').default;

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
                    message: 'Article Not Found'
                });
            }
            let vehicle = await Vehicle.findById(article.vehicle_id);
            if (!vehicle) {
                return res.status(404).send({
                    message: 'Vehicle Not Found'
                });
            }
            let image = await Image.findOne({ where: { article_id: article.id } });
            console.log(image.url);
            res.render('article/show', { article: article, vehicle: vehicle, image: image });
        } catch (error) {
            res.render('error', error);
        }
    },

    add: (req, res) => {
        return Vehicle
            .create({
                user_id: 1,
                type: req.body.type || 'temp default value',
                brand: req.body.brand || 'temp default value',
                model: req.body.model || 'temp default value',
                year: req.body.year || 2018,
                description: req.body.description || 'temp default value',
                size: req.body.size || 'temp default value',
                base_lenght: req.body.base_lenght || 100,
                ground_space: req.body.ground_space || 100,
                min_circle_radius: req.body.min_circle_radius || 100,
                weight_total: req.body.weight_total || 100,
                weight_self: req.body.weight_self || 100,
                max_speed: req.body.max_speed || 100,
                slope_capacity: req.body.slope_capacity || 100,
                seat_number: req.body.seat_number || 100,
                engine_name: req.body.engine_name || 'temp default value',
                engine_type: req.body.engine_type || 'temp default value',
                piston_volume: req.body.piston_volume || 100,
                compress_ratio: req.body.compress_ratio || 'temp default value',
                max_power: req.body.max_power || 'temp default value',
                max_momen: req.body.max_momen || 'temp default value',
                engine_position: req.body.engine_position || 'temp default value',
                fuel_volume: req.body.fuel_volume || 100,
                clutch: req.body.clutch || 'temp default value',
                gear_box_type: req.body.gear_box_type || 'temp default value',
                main_brake: req.body.main_brake || 'temp default value',
                vice_brake: req.body.vice_brake || 'temp default value',
                hand_brake: req.body.hand_brake || 'temp default value',
                steer_system: req.body.steer_system || 'temp default value',
                suspension: req.body.suspension || 'temp default value',
                wheel_size: req.body.wheel_size || 'temp default value',
                air_conditioner: req.body.air_conditioner || 'temp default value',
                sight_light: req.body.sight_light || 'temp default value',
                audio_system: req.body.audio_system || 'temp default value',
                driver_room: req.body.driver_room || 'temp default value',
                passenger_room: req.body.passenger_room || 'temp default value',
                passenger_door: req.body.passenger_door || 'temp default value',
                side_glass: req.body.side_glass || 'temp default value',
                floor: req.body.floor || 'temp default value',
                paint_type: req.body.paint_type || 'temp default value',
                other_item: req.body.other_item || 'temp default value'
                //     Articles: [{
                //         user_id: 1,
                //         title: req.body.title || 'temp default value',
                //         content: req.body.content || 'temp default value'
                //     }]
                // }, {
                //     include: [Article]
            })
            .then((vehicle) => {
                return Article
                    .create({
                        user_id: vehicle.user_id,
                        vehicle_id: vehicle.id,
                        title: req.body.title || 'temp default value',
                        content: req.body.content || 'temp default value'
                    })
                    .then((article) => {
                        //console.log("file name: " + req.file.filename + " " + !req.file);
                        let imageFileName = req.file.filename || 'placeholder.jpg'

                        return Image
                            .create({
                                article_id: article.id,
                                url: '/uploads/photo/' + imageFileName
                            }).then(() => {
                                res.redirect('/articles/' + article.id + '/detail')
                            })
                    })
            })
            .catch((error) => res.render('error', error))
    },


    edit: async (req, res) => {
        try {
            let article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send({
                    message: 'Article Not Found',
                });
            }
            let vehicle = await Vehicle.findById(article.vehicle_id);
            if (!vehicle) {
                return res.status(404).send({
                    message: 'Vehicle Not Found',
                });
            }
            let image = await Image.findOne({ where: { article_id: article.id } });
            res.render('article/edit', { article: article, vehicle: vehicle, image: image });
        } catch (error) {
            res.render('error', error);
        }
        // return Article
        //     .findById(req.params.id)
        //     .then((article) => {
        //         if (!article) {
        //             return res.status(404).send({
        //                 message: 'Article Not Found',
        //             });
        //         }
        //         res.render('article/edit', { article: article })
        //     })
        //     .catch((error) => res.render('error', error));
    },

    update: async (req, res) => {
        console.log(req.params.id);
        let newVehicleValue = {
            user_id: 1,
            type: req.body.type || 'temp default value',
            brand: req.body.brand || 'temp default value',
            model: req.body.model || 'temp default value',
            year: req.body.year || 2018,
            description: req.body.description || 'temp default value',
            size: req.body.size || 'temp default value',
            base_lenght: req.body.base_lenght || 100,
            ground_space: req.body.ground_space || 100,
            min_circle_radius: req.body.min_circle_radius || 100,
            weight_total: req.body.weight_total || 100,
            weight_self: req.body.weight_self || 100,
            max_speed: req.body.max_speed || 100,
            slope_capacity: req.body.slope_capacity || 100,
            seat_number: req.body.seat_number || 100,
            engine_name: req.body.engine_name || 'temp default value',
            engine_type: req.body.engine_type || 'temp default value',
            piston_volume: req.body.piston_volume || 100,
            compress_ratio: req.body.compress_ratio || 'temp default value',
            max_power: req.body.max_power || 'temp default value',
            max_momen: req.body.max_momen || 'temp default value',
            engine_position: req.body.engine_position || 'temp default value',
            fuel_volume: req.body.fuel_volume || 100,
            clutch: req.body.clutch || 'temp default value',
            gear_box_type: req.body.gear_box_type || 'temp default value',
            main_brake: req.body.main_brake || 'temp default value',
            vice_brake: req.body.vice_brake || 'temp default value',
            hand_brake: req.body.hand_brake || 'temp default value',
            steer_system: req.body.steer_system || 'temp default value',
            suspension: req.body.suspension || 'temp default value',
            wheel_size: req.body.wheel_size || 'temp default value',
            air_conditioner: req.body.air_conditioner || 'temp default value',
            sight_light: req.body.sight_light || 'temp default value',
            audio_system: req.body.audio_system || 'temp default value',
            driver_room: req.body.driver_room || 'temp default value',
            passenger_room: req.body.passenger_room || 'temp default value',
            passenger_door: req.body.passenger_door || 'temp default value',
            side_glass: req.body.side_glass || 'temp default value',
            floor: req.body.floor || 'temp default value',
            paint_type: req.body.paint_type || 'temp default value',
            other_item: req.body.other_item || 'temp default value'
        };

        var vehicle, article, image, err;
        [err, vehicle] = await to(Vehicle.update(newVehicleValue, {
            where: {
                id: req.params.id
            }
        })
        ); // ham update tra ve so luong row da duoc update, ko tra ve opject
        if (!vehicle) console.log("vehicle not found");
        if (err) console.log("error: " + JSON.stringify(2, undefined, err));

        var newArticleValue = {
            title: req.body.title || 'temp default value',
            content: req.body.content || 'temp default value'
        }

        if (Article)
            [err, article] = await to(Article.update(
                newArticleValue, {
                    where: {
                        id: req.body.article_id,
                        // user_id: vehicle.user_id,
                        // vehicle_id: req.params.id
                    }
                })
            );
        if (!article) console.log("article update failed!");
        if (err) console.log("error: " + JSON.stringify(2, undefined, err));

        if (req.file) {
            if (req.body.old_photo !== '') {
               // await fs.unlink('public/' + `${req.body.old_photo}`);
            }
            [err, image] = await to(Image.update({
                url: 'uploads/photo/' + req.file.filename
            }, {
                    where: {
                        id: req.body.image_id
                    }
                }
            ));
            if (image) res.redirect('/articles/' + req.body.article_id + '/detail');
            else console.log("image update failed!");
            if (err) console.log("error: " + JSON.stringify(2, undefined, err));
        };

        // [err, vehicle] = await to(Vehicle.findById(req.params.id));
        // if (!vehicle) console.log("vehicle not found");
        // if (err) console.log("error: " + JSON.stringify(2, undefined, err));


        // Vehicle.update(newVehicleValue, {
        //     where: {
        //         id: req.params.id
        //     }
        // }).then((vehicle) => {
        //     let vehicleInstance = await Vehicle.findById(req.params.id);
        //     let newArticleValue = {
        //         user_id: vehicleInstance.user_id,
        //         title: req.body.title || 'temp default value',
        //         content: req.body.content || 'temp default value'
        //     }
        //     Article.update(
        //         newArticleValue, {
        //             where: {
        //                 vehicle_id: vehicle.id
        //             }
        //         }).then((article) => {
        //             if (req.file) {
        //                 // if old photo exists (old photo not empty) then unlink / remove the photo in directory
        //                 if (req.body.old_photo !== '')
        //                     fs.unlink(`public/ + ${req.body.old_photo}`).then(() => {
        //                         Image.update({
        //                             article_id: article.id,
        //                             url: '/uploads/photo/' + imageFileName
        //                         }).then(() => {
        //                             res.redirect('/articles/' + article.id + '/detail');
        //                         })
        //                     });
        //             }

        //         });
        // }).catch((err) => {
        //     res.render('error', err)
        // })

        /*return Vehicle
            .update({
                user_id: 1,
                type: req.body.type || 'temp default value',
                brand: req.body.brand || 'temp default value',
                model: req.body.model || 'temp default value',
                year: req.body.year || 2018,
                description: req.body.description || 'temp default value',
                size: req.body.size || 'temp default value',
                base_lenght: req.body.base_lenght || 100,
                ground_space: req.body.ground_space || 100,
                min_circle_radius: req.body.min_circle_radius || 100,
                weight_total: req.body.weight_total || 100,
                weight_self: req.body.weight_self || 100,
                max_speed: req.body.max_speed || 100,
                slope_capacity: req.body.slope_capacity || 100,
                seat_number: req.body.seat_number || 100,
                engine_name: req.body.engine_name || 'temp default value',
                engine_type: req.body.engine_type || 'temp default value',
                piston_volume: req.body.piston_volume || 100,
                compress_ratio: req.body.compress_ratio || 'temp default value',
                max_power: req.body.max_power || 'temp default value',
                max_momen: req.body.max_momen || 'temp default value',
                engine_position: req.body.engine_position || 'temp default value',
                fuel_volume: req.body.fuel_volume || 100,
                clutch: req.body.clutch || 'temp default value',
                gear_box_type: req.body.gear_box_type || 'temp default value',
                main_brake: req.body.main_brake || 'temp default value',
                vice_brake: req.body.vice_brake || 'temp default value',
                hand_brake: req.body.hand_brake || 'temp default value',
                steer_system: req.body.steer_system || 'temp default value',
                suspension: req.body.suspension || 'temp default value',
                wheel_size: req.body.wheel_size || 'temp default value',
                air_conditioner: req.body.air_conditioner || 'temp default value',
                sight_light: req.body.sight_light || 'temp default value',
                audio_system: req.body.audio_system || 'temp default value',
                driver_room: req.body.driver_room || 'temp default value',
                passenger_room: req.body.passenger_room || 'temp default value',
                passenger_door: req.body.passenger_door || 'temp default value',
                side_glass: req.body.side_glass || 'temp default value',
                floor: req.body.floor || 'temp default value',
                paint_type: req.body.paint_type || 'temp default value',
                other_item: req.body.other_item || 'temp default value'
                //     Articles: [{
                //         user_id: 1,
                //         title: req.body.title || 'temp default value',
                //         content: req.body.content || 'temp default value'
                //     }]
                // }, {
                //     include: [Article]
            })
            .then((vehicle) => {
                return Article
                    .update({
                        user_id: vehicle.user_id,
                        vehicle_id: vehicle.id,
                        title: req.body.title || 'temp default value',
                        content: req.body.content || 'temp default value'
                    })
                    .then((article) => {
                        return 
                        res.redirect('/articles/' + article.id + '/detail')
                    })
            })
            .catch((error) => res.render('error', error))
            */
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
