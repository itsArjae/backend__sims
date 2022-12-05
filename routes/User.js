const express = require('express')
const router = express.Router()
const userController = require('../controller/user/userController')
const {Applications,Scholars} = require("../models")
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.get('/checkbatches/:bid/:stn',userController.checkBatches);
router.post('/applybatches/:bid/:stn',userController.applyBatches);
router.post('/approval/:bid/:stn',userController.approval);
router.post('/forgotpass/user',userController.forgotPass);


router.get('/fetch/:id',async (req,res,next)=>{
    const id = req.params.id;
    const app = await Applications.findAll({
      where:{
        BatchId: id
      }
    });
    res.json(app);
  });

  router.get('/fetch/fullname/:id',async (req,res,next)=>{
    const id = req.params.id;
    const user = await Scholars.findOne({
      where:{studentno:id}
    });

    res.json(user);
  });
module.exports = router;