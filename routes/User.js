const express = require('express')
const router = express.Router()
const userController = require('../controller/user/userController')

router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/checkbatches/:bid/:stn',userController.checkBatches);
router.post('/applybatches/:bid/:stn',userController.applyBatches);
module.exports = router;