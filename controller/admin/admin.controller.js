const express = require("express");
const { Admin } = require("../../models");
const bcryptjs = require("bcryptjs");

const saveAdmin = async (req, res, next) => {
  const tempEmail = "simsbulsu2022@gmail.com";
  const email = await Admin.findOne({
    where: { email: tempEmail },
  });
  if (!email) {
    const newPassword = bcryptjs.hashSync("Bulsu2022", 10);
    const saveData = {
      email: "simsbulsu2022@gmail.com",
      password: newPassword,
    };
    await Admin.create(saveData);
    res.json({ error: 700 });
    return;
  }
  res.json({ error: 701 });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const foundAdmin = await Admin.findOne({
    where: {
      email: email,
    },
  });

  if(!foundAdmin){
    res.json({error:"Email doesn't Exist"});
    return;
  }
  const tempPassword = foundAdmin.password;

  const result = bcryptjs.compareSync(password, tempPassword); 

  if(!result){
    res.json({error:"Wrong Password"});
    return
  }

  res.json({success:"success",uid:foundAdmin.id});

};

const getAdmin = async (req, res, next) => {
  const admin = await Admin.findAll();
  res.json(admin);
};

module.exports = { saveAdmin, getAdmin,adminLogin };
