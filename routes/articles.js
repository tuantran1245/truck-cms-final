var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const articleController = require('../controllers/article');

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
router.post('/', upload.single('photo'), articleController.add);
router.get('/:id/detail', articleController.getById);
router.get('/:id/edit', articleController.edit);
router.put('/:id/update/', upload.single('photo'), articleController.update);
router.get('/:id/delete', articleController.delete);

router.get('/new', (req, res) => {
    res.render('article/create');
});

module.exports = router;