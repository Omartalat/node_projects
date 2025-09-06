const router = require('express').Router();
const controllers = require('./../controllers/noteController');

router.route('/').get(controllers.getAllNote).post(controllers.createNote);
router.route('/:id').get(controllers.getNote).patch(controllers.updateNote).delete(controllers.deleteNote);

module.exports = router;
