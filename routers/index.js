const router = require('express').Router();
const photo = require('./photoRouter');
const user = require('./userRouter')

router.use('/',user)
router.use('/',photo)

module.exports = router;