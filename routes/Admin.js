const express = require('express')
const router = express.Router();
const adminController = require('../controller/admin/admin.controller');
const { Admin } = require("../models");
const bcryptjs = require('bcryptjs');

router.post('/login',adminController.adminLogin);
router.get('/fetch/id/:id',adminController.getAdminInfo);

router.post("/update", async (req, res, next) => {
    const data = req.body;
    const {pass,cpass} = data;

    if(cpass != pass){
        res.json({error:"Password do not match"});
        return;
    }

    const newPassword = bcryptjs.hashSync(pass, 10);


    const email = req.body.email;
    const updateAdmin = await Admin.update({
        password:newPassword
    }, {
      where: {
        email: email
      },
    });
  
    res.json("success");
  });

  router.post('/create/new',async(req,res,next)=>{
    const data = req.body;
    const {username,email,password,role} = data;

    
    const newPassword = bcryptjs.hashSync(password, 10);

    const newData = {username:username,email:email,password:newPassword,role:role};
    

    await Admin.create(newData);
    res.json("success");
  })

module.exports = router;


