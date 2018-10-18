// const User = require("../models/user");
// const Vehicle = require("../models/vehicle");
// const Article = require("../models/article");
// const Image = require("../models/image");
// const faker = require('faker');

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

// const userSeed = () => { 
//     for (var i = 0; i < 10; i++) {
//       User.create({
//         full_name: faker.name.findName(),
//         email: faker.internet.email(),
//         dob: faker.date.past(),
//         phone: faker.random.number(),
//         address:faker.address.streetAddress(),
//         identity_number: faker.random.number(),
//         license_number: faker.random.number()
//       }).then((user) => {
//         console.log('user created: ' + JSON.stringify(user, undefined, 2))
//       }).catch(err => {
//         console.log('user created failed '+ err)
//       })
//     }
// }

// const vehicleSeed = () => {
//     for (var i = 0; i < 50; i++) {
//         Vehicle.create({
//           user_id: getRandomInt(1, 10),
//           type: faker.lorem.word(),
//           brand: faker.lorem.word(),
//           model: faker.lorem.word(),
//           year: faker.date.past().year,
//           description: faker.lorem.sentence(),
//           size: faker.random.number() + "x" + faker.random.number(),
//           base_lenght: faker.random.number(),
//           ground_space: faker.random.number(),
//           min_circle_radius: faker.random.number(),
//           weight_total: faker.random.number(),
//           weight_self: faker.random.number(),
//           max_speed: faker.random.number(),
//           slope_capacity: faker.random.number(),
//           seat_number: faker.random.number(),
//           engine_name: faker.lorem.sentence(),
//           engine_type: faker.lorem.sentence(),
//           piston_volume: faker.random.number(),
//           compress_ratio: faker.random.number() + ":" + faker.random.number(),
//           max_power: faker.random.number(),
//           max_momen: faker.lorem.sentence(),
//           engine_position: faker.lorem.sentence(),
//           fuel_volume: faker.random.number(),
//           clutch: faker.lorem.sentence(),
//           gear_box_type: faker.lorem.sentence(),
//           main_brake: faker.lorem.sentence(),
//           vice_brake: faker.lorem.sentence(),
//           hand_brake: faker.lorem.sentence(),
//           steer_system: faker.lorem.sentence(),
//           suspension: faker.lorem.sentence(),
//           wheel_size: faker.random.number() + "x" + faker.random.number(),
//           air_conditioner: faker.lorem.sentence(),
//           sight_light: faker.lorem.sentence(),
//           audio_system: faker.lorem.sentence(),
//           driver_room: faker.lorem.sentence(),
//           passenger_room: faker.lorem.sentence(),
//           passenger_door: faker.lorem.sentence(),
//           side_glass: faker.lorem.sentence(),
//           floor: faker.lorem.sentence(),
//           paint_type: faker.lorem.sentence(),
//           other_item: faker.lorem.sentence(),

//         }).then((vehicle) => {
//           console.log('user created: ' + JSON.stringify(vehicle, undefined, 2))
//         }).catch(err => {
//           console.log('user created failed '+ err)
//         })
//       }
// }

// const articleSeed = () => {
//     for (var i = 0; i < 50; i++) { 
//         Article.create({
//             user_id: getRandomInt(1, 10),
//             vehicle_id: i,
//             title: faker.lorem.sentence(),
//             content: faker.lorem.paragraphs(),
//         })
//     }
// }

// module.exports = {
//     userSeed,
//     vehicleSeed,
//     articleSeed
// }