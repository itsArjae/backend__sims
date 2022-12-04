const express = require('express')
const router = express.Router();
const adminController = require('../controller/admin/admin.controller');
const { Admin } = require("../models");
const bcryptjs = require('bcryptjs');

router.post('/login',adminController.adminLogin);
router.get('/fetch/id/:id',adminController.getAdminInfo);

router.post("/update", async (req, res, next) => {
    const data = req.body;
    const {pass,cpass,oldpass} = data;

    

    const newPassword = bcryptjs.hashSync(pass, 10);


    const email = req.body.email;

    const foundUser = await Admin.findOne({
      where:{email:email}
    })

    if(!foundUser){
      res.json({error:"Email doesn't exist"});
      return;
    }

    const tempPassword = foundUser.password;

    const result = bcryptjs.compareSync(oldpass, tempPassword); 

    if(!result){
      res.json({error:"Wrong old password"});
      return;
    }

    if(cpass != pass){
      res.json({error:"Password do not match"});
      return;
  }

    const updateAdmin = await Admin.update({
        password:newPassword
    }, {
      where: {
        email: email
      },
    });
  
    res.json(data);
  });

  router.post('/create/new',async(req,res,next)=>{
    const data = req.body;
    const {username,email,password,role} = data;

    const foundUser = await Admin.findOne({
      where:{email:email}
    })
    if(foundUser){
      res.json({error:"Email already exist"});
      return;
    }
    const newPassword = bcryptjs.hashSync(password, 10);

    const newData = {username:username,email:email,password:newPassword,role:role};
    

    await Admin.create(newData);
    res.json(data);
  });

  router.post("/changepass",async(req,res,next)=>{
    const data = req.body;
    const {email,password} = data;
    const foundUser = await Admin.findOne({
      where:{email:email}
    })

    const newPassword = bcryptjs.hashSync(password, 10);
    if(!foundUser){
      res.json({error:"Email doesn't exist"})
      return;
    }

    const updateRow = await Admin.update({
      password:newPassword
    },
    {
      where:{email:email}
    })





    res.json(updateRow);
    // res.json({message:"hello"})
  })

module.exports = router;


