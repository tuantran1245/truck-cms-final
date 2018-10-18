// const User = require("../models/user");
// const Vehicle = require("../models/vehicle");
// const Article = require("../models/article");
// const Image = require("../models/image");

// function getVehicleByID(id) {
//     Vehicle.findById(id).then (vehicle => {
//         console.log(JSON.stringify(vehicle, undefined, 2));
//         return vehicle;
//     }).catch((err) => {
//         console.log("cannot get vehicle, error: " + err);
//     });
// }

// function getArticleByVehicleID (vehicleID) {
//     Article.findOne ({
//         where: {
//             vehicle_id: vehicleID
//         }
//     }).then(article => {
//         console.log(JSON.stringify(article, undefined, 2));
//         return article;
//     }).catch((err) => {
//         console.log("cannot get article, error: " + err);
//     });
// }

// function getImagesByArticleID (articleID) {
//     Image.findAll({
//         where: {
//             article_id: articleID
//         }
//     }).then(images => {
//         console.log(JSON.stringify(article, undefined, 2));
//         return article;
//     }).catch((err) => {
//         console.log("cannot get article, error: " + err);
//     })
// }


