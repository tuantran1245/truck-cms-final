// const User = require("../models/user");
// const Vehicle = require("../models/vehicle");
// const Article = require("../models/article");
// const Image = require("../models/image");


// const migrateUser = () => {
//     return User.sync().then(() => {
//       console.log('user table created successfully');
//     }).catch(error => {
//       console.log('user table created fail! ' + error);
//     });
// }

// const migrateVehicle = () => {
//     return Vehicle.sync().then(() => {
//         console.log('vehicle table created successfully');
//     }).catch(error => {
//         console.log('vehicle table created fail! ' + error);
//     });
// }

// const migrateArticle = () => {
//     return Article.sync().then(() => {
//         console.log('article table created successfully');
//     }).catch(error => {
//         console.log('article table created fail! ' + error);
//     });
// }

// const migrateImage = () => {
//     return Image.sync().then(() => {
//         console.log('image table created successfully');
//     }).catch(error => {
//         console.log('image table created fail! ' + error);
//     });
// }

// const migrate = () => {
//     //Create db table:
//     // User.sync().then(() => {
//     //   console.log('user table created successfully');
//     // }).catch(error => {
//     //   console.log('user table created fail! ' + error);
//     // });
//     // Vehicle.sync().then(() => {
//     //   console.log('vehicle table created successfully');
//     // }).catch(error => {
//     //   console.log('vehicle table created fail! ' + error);
//     // });
//     // Article.sync().then(() => {
//     //   console.log('article table created successfully');
//     // }).catch(error => {
//     //   console.log('article table created fail! ' + error);
//     // });
//     // Image.sync().then(() => {
//     //   console.log('image table created successfully');
//     // }).catch(error => {
//     //   console.log('image table created fail! ' + error);
//     // });
// }

// module.exports = {
//     migrateUser,
//     migrateVehicle,
//     migrateArticle,
//     migrateImage
// };  