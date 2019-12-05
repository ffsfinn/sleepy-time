const router = require('express').Router();
const sleepNote = require('../controllers/notes')

router.get('/', sleepNote.index);
router.post('/:userId', sleepNote.create);
router.get('/:id', sleepNote.show);

module.exports = router;