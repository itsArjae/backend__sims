const express = require('express');
const router = express.Router();
const {Announcements} = require('../models');

router.post('/create',async(req,res,next)=>{

  const data = req.body;
  await Announcements.create(data);
  res.json(data);

})

router.get('/fetch',async(req,res,next)=>{
  const data = await Announcements.findAll();
  res.json(data);
})

module.exports = router;