var express = require('express');
var router = express.Router();
const articleController = require('../controllers/article');

/* article Router */
router.get('/', articleController.list);
router.post('/', articleController.add);
router.get('/:id/detail', articleController.getById);
// router.get('/:id/edit', articleController.edit);
// router.put('/:id/update/', articleController.update);
// router.get('/:id/delete', articleController.delete);

router.get('/new', (req, res) => {
    res.render('article/create');
});

module.exports = router;