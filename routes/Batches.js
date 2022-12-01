const express = require('express')
const router = express.Router();
const {Batches,Scholarsrecords} = require('../models');

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

router.post('/edit/name/:id',async(req,res,next)=>{
  const id = req.params.id;
  const data = req.body;
  const {batchName} = data;

  const updatedRows = await Batches.update({
    batchname: batchName
  },{
    where:{id:id}
  });

  res.json(updatedRows);
})

router.post('/delete/:id',async(req,res,next)=>{
  const id = req.params.id;

  const deletebatch = await Batches.destroy({
    where: { id:id }
  })
  res.json(deletebatch);
});

router.get('/batches/size/:id',async(req,res,next)=>{
  const id = req.params.id;

  const size = await Scholarsrecords.count({
    where:{
      BatchId:id
    }
  });

  res.json({size:size})
})

module.exports = router;