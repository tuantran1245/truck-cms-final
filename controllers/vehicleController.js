// const User = require("../models/user");
// const Vehicle = require("../models/vehicle");
// const Article = require("../models/article");
// const Image = require("../models/image");

// exports.getAllVehicles = function () {
//     return Vehicle.findAll().then (vehicle => {
//         //console.log(JSON.stringify(vehicle, undefined, 2));
//         return vehicle;
//     }).catch((err) => {
//         console.log("cannot get vehicle, error: " + err);
//     });
// }

// exports.getVehicleByID = function (id) {
//     return Vehicle.findById(id).then (vehicle => {
//         console.log(JSON.stringify(vehicle, undefined, 2));
//         return vehicle;
//     }).catch((err) => {
//         console.log("cannot get vehicle, error: " + err);
//     });
// }

// exports.getArticleByVehicleID = function (vehicleID) {
//     return Article.findOne ({
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

// exports.getImagesByArticleID = function (articleID) {
//     return Image.findAll({
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
