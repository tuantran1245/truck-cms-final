const User = require('../models').User;
const { validationResult } = require('express-validator/check');
const to = require('await-to-js').default;
module.exports = {
	list: (req, res) => {
		return User
			.findAll()
			.then((users) => {
				res.render('user/index', { users: users });
			})
			.catch((error) => { res.render('error', error); });
	},

	// list: () => {
	// 	return User.findAll().then(users => {
	// 		return users;
	// 	}).catch((error) => {
	// 		console.log(JSON.stringify(error, undefined, 2));
	// 		return error;
	// 	});
	// },

	getById: (req, res) => {
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				res.render('user/show', { user: user })
			})
			.catch((error) => res.render('error', error));
	},

	// getById: (id) => {
	// 	return User.findById(id).then(user => {
	// 		console.log(JSON.stringify(user, undefined, 2));
	// 		return user;
	// 	}).catch((error) => {
	// 		console.log(JSON.stringify(error, undefined, 2));
	// 		return error;
	// 	});
	// },

	add: (req, res) => {
		const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
		return User
			.create({
				full_name: req.body.full_name,
				email: req.body.email,
				dob: req.body.dob,
				phone: req.body.phone,
				address: req.body.address,
				identity_number: req.body.identity_number,
				license_number: req.body.license_number
			})
			.then((user) => {
				res.redirect('/users')
			})
			.catch((error) => res.render('error', error));
	},

	edit: (req, res) => {
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				res.render('user/edit', { user: user })
			})
			.catch((error) => res.render('error', error));
	},

	// edit: (id) => {
	// 	return User.findById(id).then(user => {
	// 		return user;
	// 	}).catch((error) => {
	// 		return error;
	// 	});
	// },

	update: async (req, res) => {
		console.log(req.params.id);
		console.log(req.body.full_name);
		const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
		}
		
		var user, err;
        [err, user] = await to(User.update({
			full_name: req.body.full_name || 'temp default value',
			email: req.body.email || 'temp default value',
			dob: req.body.dob || 'temp default value',
			phone: req.body.phone || 'temp default value',
			address: req.body.address || 'temp default value',
			identity_number: req.body.identity_number || 'temp default value',
			license_number: req.body.license_number || 'temp default value'
		}, {
            where: {
                id: req.params.id
            }
        })
        ); // ham update tra ve so luong row da duoc update, ko tra ve opject
		if (!user) console.log("user not found");
		else res.redirect('/users/' + req.params.id + '/detail');
        if (err) console.log("error: " + JSON.stringify(2, undefined, err));
	},

	// update: (id,full_name, email, dob, phone, address, identity_number, license_number) => {
	// 	return User.findById(id).then(user => {
	// 		return user.update({
	// 			full_name: full_name,
	// 			email: email,
	// 			dob: dob,
	// 			phone: phone,
	// 			address: address,
	// 			identity_number:identity_number,
	// 			license_number: license_number
	// 		});
	// 	}).catch((error) => {
	// 		return error;
	// 	});
	// },

	delete: (req, res) => {
		return User.findById(req.params.id)
			.then(user => {
				if (!user) {
					return res.status(400).send({
						message: 'User Not Found',
					});
				}
				return User.destroy({
					where: {
						id: user.id
					}
				}).then(() => {
					res.redirect('/users')
				}).catch((err) => {
					res.render('error', err)
				})
			})
			.catch((error) => res.render('error', error));
	},
};

// router.get('/:id/delete', (req, res) => {
// 	User.findById(req.params.id)
// 		.then((user) => {
// 			console.log(user.dataValues.photo)
// 			fs.unlink(`uploads/photo/${user.dataValues.photo}`, () => {
// 				User.destroy({
// 					where: {
// 						id: user.dataValues.id
// 					}
// 				}).then(() => {
// 					res.redirect('/users')
// 				}).catch((err) => {
// 					res.render('error', err)
// 				})
// 			})
// 		}).catch((err) => {
// 			res.render('error', err)
// 		})
// })


// 	delete: (id) => {
// 		return User.findById(id).then(user =>{
// 			return user.destroy()
// 		}).catch((error) => {
// 				return error;
// 		});
// 	},
// }

// var express = require('express');
// var fs = require('fs');
// var router = express.Router();
// // handle multipart form data
// const multer = require('multer');
// const path = require('path');

// const models = require('../models');
// const User = models.User;

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		// set uploads directory
// 		cb(null, 'uploads/photo/')
// 	},
// 	filename: (req, file, cb) => {
// 		// save file with current timestamp + user email + file extension
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	}
// })

// // initialize the multer configuration
// const upload = multer({storage: storage});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
// 	User.findAll()
// 	.then((users) => {
// 	  res.render('user/index', {users: users});
// 	})
// });

// router.post('/', (req, res) => {
// 	User.create({
// 		full_name: req.body.full_name,
// 		email: req.body.email,
// 		dob: req.body.dob,

// 		//photo: !req.file ? 'placeholder.jpg' : req.file.filename
// 	}).then((user) => {
// 		res.redirect('/users')
// 	}).catch((err) => {
// 		res.render('error', err);
// 	})
// })

// router.get('/:id/list', (req, res) => {
// 	User.findById(req.params.id)
// 		.then((user) => {
// 			res.render('user/show', user.dataValues)
// 		}).catch((err) => {
// 			res.render('error', err)
// 		})
// })

// router.get('/new', (req, res) => {
// 	console.log('aa')
// 	res.render('user/create');
// })

// router.get('/:id/edit', (req, res) => {
// 	User.findById(req.params.id)
// 		.then((user) => {
// 			res.render('user/edit', user.dataValues)
// 		}).catch((err) => {
// 			res.render('error', err);
// 		})
// })

// router.put('/:id/edit/', upload.single('photo'), (req, res) => {
// 	const user = {
// 		first_name: req.body.firstname,
// 		last_name: req.body.lastname,
// 		email: req.body.email
// 	}
// 	// if user upload new photo, then remove old photo and save photo's name in database
// 	/*if (req.file) {
// 		// if old photo exists (old photo not empty) then unlink / remove the photo in directory
// 		if (req.body.old_photo !== '')
// 			fs.unlink(`uploads/photo/${req.body.old_photo}`);
// 		user.photo = req.file.filename
// 	}
// 	User.update(user, {
// 		where: {
// 			id: req.params.id
// 		}
// 	}).then((user) => {
// 		res.redirect('/users')
// 	}).catch((err) => {
// 		res.render('error', err);
// 	})*/
// })

// router.get('/:id/delete', (req, res) => {
// 	User.findById(req.params.id)
// 		.then((user) => {
// 			console.log(user.dataValues.photo)
// 			fs.unlink(`uploads/photo/${user.dataValues.photo}`, () => {
// 				User.destroy({
// 					where: {
// 						id: user.dataValues.id
// 					}
// 				}).then(() => {
// 					res.redirect('/users')
// 				}).catch((err) => {
// 					res.render('error', err)
// 				})
// 			})
// 		}).catch((err) => {
// 			res.render('error', err)
// 		})
// })

// module.exports = router;
