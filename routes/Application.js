const express = require('express')
const router = express.Router()
const {Applications} = require('../models');

router.get('/fetch/:id',async (req,res,next)=>{
    const id = req.params.id;
    const app = await Applications.findAll({
      where:{
        BatchId: id
      }
    });
    res.json(app);
  });