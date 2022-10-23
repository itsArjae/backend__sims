const express = require('express')
const router = express.Router();
const {Batches} = require('../models');

router.post('/create',async (req,res,next)=>{
    const batch = req.body;
    await Batches.create(batch);
    res.json(batch);
});
router.get('/fetch/:id',async (req,res,next)=>{
  const id = req.params.id;
  const batches = await Batches.findAll({
    where:{
      ScholarshipId: id
    }
  });
  res.json(batches);
});


module.exports = router;