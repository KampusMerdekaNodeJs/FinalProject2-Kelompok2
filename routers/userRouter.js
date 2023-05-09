const router = require('express').Router();
const UserControll = require('../controllers/userController');

//user
router.post('/users/register', UserControll.register)
router.post('/users/login', UserControll.login)
router.put('/users/:id', UserControll.updateUser)
router.delete('/users/:id', UserControll.deleteUser);

module.exports = router