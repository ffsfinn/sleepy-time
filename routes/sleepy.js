const router = require('express').Router();
const sleepTime = require('../controllers/sleepy')

router.get('/', sleepTime.index)

module.exports = router;