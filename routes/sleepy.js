const router = require('express').Router();
const sleepTime = require('../controllers/sleepy')

router.get('/', sleepTime.index);
router.post('/', sleepTime.create);
router.get('/:id', sleepTime.show);

module.exports = router;