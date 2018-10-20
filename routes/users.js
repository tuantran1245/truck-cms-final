var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* user Router */
router.get('/', userController.list);
router.post('/', userController.add);
router.get('/:id/detail', userController.getById);
router.get('/:id/edit', userController.edit);
router.put('/:id/update/', userController.update);
router.get('/:id/delete', userController.delete);

router.get('/new', (req, res) => {
    res.render('user/create');
});

// router.get('/', async (req, res) => {
//     res.render('user/index', {
//         users: await userController.list()
//     });
// });

// router.get('/:id/detail', async (req, res) => {
//     res.render('user/show', {
//         user: await userController.add(req.params.id)
//     });
// });

// router.get('/new', async (req, res) => {
//     res.render('user/create');
// });

// router.post('/', async (req, res) => {
//     userController.add(req.body.full_name, req.body.email, req.body.dob, req.body.phone, req.body.address, req.body.identity_number, req.body.license_number, res)
// });

// router.get('/:id/edit', async (req, res) => {
//     res.render('user/edit', {
//         user: await userController.edit(req.params.id)
//     });
// });

module.exports = router;
