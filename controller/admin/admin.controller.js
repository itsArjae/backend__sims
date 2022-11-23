const express = require("express");
const { Admin } = require("../../models");
const bcryptjs = require("bcryptjs");



const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const tempEmail = "simsbulsu2022@gmail.com";

  const foundAdmin = await Admin.findOne({
    where:{email:tempEmail}
  });

  if(!foundAdmin){
    if(email == "simsbulsu2022@gmail.com" && password == "Bulsu2022"){
      const newPassword = bcryptjs.hashSync("Bulsu2022", 10);
      const saveData = {
        username:"SuperAdmin",
        email: "simsbulsu2022@gmail.com",
        password: newPassword,
        role:"SuperAdmin"
      };
      await Admin.create(saveData);
      res.json({uid:1});
    }
    else{
      res.json({error:"Wrong Password/Email"});
      return;
    }
    return;
  }
  
  const admin = await Admin.findOne({
    where:{email:email}
  });

  if(!admin){
    res.json({error:"Email doesn't exist"});
    return;
  }

  const tempPassword = admin.password;

  const result = bcryptjs.compareSync(password, tempPassword); 

  if(!result){
    res.json({error:"Wrong Password"});
    return;
  }

  res.json({uid:admin.id});

};


const getAdmin = async (req, res, next) => {
  const admin = await Admin.findAll();
  res.json(admin);
};

const getAdminInfo = async (req,res,next) => {
  const id = req.params.id;
  const adminData = await Admin.findOne({
    where:{
      id:id
    }
  })

  res.json(adminData);

}

module.exports = { getAdmin, adminLogin, getAdminInfo };
