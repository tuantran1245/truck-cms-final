var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;

/* user Router */
router.get('/', userController.list);
router.get('/new', userController.add);
router.get('/:id/list', userController.getById);
router.get('/:id/edit', userController.edit);
router.put('/:id/edit/', userController.update);
router.delete('/:id/delete', userController.delete);

module.exports = router;