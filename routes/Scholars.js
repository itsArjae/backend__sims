const express = require('express');
const router = express.Router();
const { Scholarsrecords } = require('../models');
var sequelize = require('sequelize');
const scholarsController = require('../controller/scholars/scholars.controller');
router.post('/create',scholarsController.saveScholars);
router.get('/fetch/batch/:id/:bid',scholarsController.getScholarsBatch);
router.get('/fetch/all',scholarsController.getAllScholars);
router.get('/fetch/:id',scholarsController.getScholarsInfo);
router.get('/fetch/record/:id',scholarsController.getScholarRecord);
router.get('/fetch/stats/:id',scholarsController.getStatistics);

router.get("/count", async (req, res, next) => {
    const id = req.params.id; 
    const year = new Date();
    const size = await Scholarsrecords.count(
        {
            where:{year:year.getFullYear()}
        }
    );
    res.json({size:size});
    
  });
//router.post('/update',);


router.get('/distinct/year',async(req,res,next)=>{

   const findYear = await Scholarsrecords.findAll({
    attributes: ['year']
});

let newSet = [];

findYear.map((data)=>{
    newSet.push(data.year)
})


let uniqueChars = [];
newSet.forEach((element) => {
    if (!uniqueChars.includes(element)) {
        uniqueChars.push(element);
    }
});

let countYear = [];

    for(var i=0; i<uniqueChars.length; i++){
         const addData = await Scholarsrecords.count({
            where:{
                year:uniqueChars[i]
            }
         })
        countYear.push({year:uniqueChars[i],value:addData});
    }
  res.json(countYear)
})
module.exports = router;