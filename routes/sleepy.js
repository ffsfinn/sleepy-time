const router = require('express').Router();
const sleepTime = require('../controllers/sleepy')

router.get('/', sleepTime.index);
router.post('/:userId', sleepTime.create);
router.get('/:id', sleepTime.show);
router.delete(':id', sleepTime.delete);

module.exports = router;