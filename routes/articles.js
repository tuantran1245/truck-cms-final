var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const articleController = require('../controllers/article');
const { check } = require('express-validator/check');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// set uploads directory
		cb(null, 'public/uploads/photo/')
	},
	filename: (req, file, cb) => {
		// save file with current timestamp + user email + file extension
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

// initialize the multer configuration
const upload = multer({storage: storage});

/* article Router */
router.get('/', articleController.list);
router.post('/', upload.single('photo'), [check('type').isLength({ min: 2 }).withMessage("Loại xe không hợp lệ"),
										  check('brand').isLength({ min: 2 }).withMessage("Thương hiệu không hợp lệ"),
										  check('model').isLength({ min: 2 }).withMessage("Model xe không hợp lệ"),
										  check('title').isLength({ min: 2 }).withMessage("Tên bài viết không hợp lệ"),
										  check('content').isLength({ min: 5 }).withMessage("Nội dung bài viết không hợp lệ")], 
										  articleController.add);
router.get('/:id/detail', articleController.getById);
router.get('/:id/edit', articleController.edit);
router.put('/:id/update', upload.single('photo'), [check('type').isLength({ min: 2 }).withMessage("Loại xe không hợp lệ"),
												   check('brand').isLength({ min: 2 }).withMessage("Thương hiệu không hợp lệ"),
												   check('model').isLength({ min: 2 }).withMessage("Model xe không hợp lệ"),
												   check('title').isLength({ min: 2 }).withMessage("Tên bài viết không hợp lệ"),
												   check('content').isLength({ min: 5 }).withMessage("Nội dung bài viết không hợp lệ")], 
												   articleController.update);
router.get('/:id/delete', articleController.delete);

router.get('/new', (req, res) => {
    res.render('article/create');
});

module.exports = router;