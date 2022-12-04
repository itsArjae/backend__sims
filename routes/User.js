const express = require('express')
const router = express.Router()
const userController = require('../controller/user/userController')

router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/fetch/:id',userController.getUsersInfo);

module.exports = router;