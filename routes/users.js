var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const { check } = require('express-validator/check');

/* user Router */
router.get('/', userController.list);
router.post('/',  [check('full_name').isLength({ min: 2 }).withMessage('Tên người dùng không hợp lệ'),
                   check('email').isEmail().withMessage("Địa chỉ email không hợp lệ"),
                   check('dob').matches(/^([0-2][0-9]|(3)[0-1])(\/)(([0-9])|((1)[0-2]))(\/)\d{4}$/i).withMessage("Ngày tháng năm sinh không hợp lệ"),
                   check('phone').isLength({ min: 5 }).isNumeric().withMessage("Số điện thoại không hợp lệ"),
                   check('address').isLength({ min: 2 }).withMessage("Địa chỉ không hợp lệ"),
                   check('identity_number').isLength({ min: 5 }).isAlphanumeric().withMessage("Số CMND không hợp lệ"),
                   check('license_number').isLength({ min: 5 }).isNumeric().withMessage("số giấy phép lái xe không hợp lệ")], 
                 userController.add);
router.get('/:id/detail', userController.getById);
router.get('/:id/edit', userController.edit);
router.put('/:id/update/', [check('full_name').isLength({ min: 2 }).withMessage('Tên người dùng không hợp lệ'),
                            check('email').isEmail().withMessage("Địa chỉ email không hợp lệ"),
                            check('dob').matches(/^([0-2][0-9]|(3)[0-1])(\/)(([0-9])|((1)[0-2]))(\/)\d{4}$/i).withMessage("Ngày tháng năm sinh không hợp lệ"),
                            check('phone').isLength({ min: 5 }).isNumeric().withMessage("Số điện thoại không hợp lệ"),
                            check('address').isLength({ min: 2 }).withMessage("Địa chỉ không hợp lệ"),
                            check('identity_number').isLength({ min: 5 }).isAlphanumeric().withMessage("Số CMND không hợp lệ"),
                            check('license_number').isLength({ min: 5 }).isNumeric().withMessage("số giấy phép lái xe không hợp lệ")], 
                            userController.update);
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
