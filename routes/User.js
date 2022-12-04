const express = require('express')
const router = express.Router()
const userController = require('../controller/user/userController')
const {Applications} = require("../models")
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/checkbatches/:bid/:stn',userController.checkBatches);
router.post('/applybatches/:bid/:stn',userController.applyBatches);

router.get('/fetch/:id',async (req,res,next)=>{
    const id = req.params.id;
    const app = await Applications.findAll({
      where:{
        BatchId: id
      }
    });
    res.json(app);
  });
module.exports = router;