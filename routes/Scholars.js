const express = require('express');
const router = express.Router();
const { Scholarsrecords } = require('../models');
const { Scholars } = require('../models');
var sequelize = require('sequelize');
const scholarsController = require('../controller/scholars/scholars.controller');
router.post('/create',scholarsController.saveScholars);
router.get('/fetch/batch/:id/:bid',scholarsController.getScholarsBatch);
router.get('/fetch/all',scholarsController.getAllScholars);
router.get('/fetch/:id',scholarsController.getScholarsInfo);
router.get('/fetch/record/:id',scholarsController.getScholarRecord);
router.get('/fetch/stats/:id',scholarsController.getStatistics);

router.get("/count", async (req, res, next) => {
  
    const year = new Date();
    const size = await Scholarsrecords.count(
        {
            where:{year:year.getFullYear()}
        }
    );
    res.json({size:size});
    
  });

  router.get("/count/dep", async (req, res, next) => {
  
    const cite = "CITE";
    const cit = "CIT";
    const cba = "CBA";
    const coed = "COED";
    const year = new Date();
    const depcite = await Scholarsrecords.findAll(
        {
            where:{
                   department:cite,
                   year:year.getFullYear()
                  }
        }
    );

    const depcit = await Scholarsrecords.findAll(
      {
          where:{
                 department:cit,
                 year:year.getFullYear()
                }
      }
  );

    const depcba = await Scholarsrecords.findAll(
    {
        where:{
               department:cba,
               year:year.getFullYear()
              }
    }
);

    const depcoed = await Scholarsrecords.findAll(
  {
      where:{
             department:coed,
             year:year.getFullYear()
      }
  }
);
    res.json([{name:"CITE",value:depcite.length},{name:"CIT",value:depcit.length},{name:"COED",value:depcoed.length},{name:"CBA",value:depcba.length}]);
    
  });
//router.post('/update',);


router.get('/distinct/year/id/:id',async(req,res,next)=>{
    const id = req.params.id; 
    const findYear = await Scholarsrecords.findAll({
     attributes: ['year'],
     where: {
        ScholarshipId: id
     }
     
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
 
 let sorted = uniqueChars.sort();
 let countYear = [];
 
     for(var i=0; i<sorted.length; i++){
          const addData = await Scholarsrecords.count({
             where:{
                 year:sorted[i],
                 ScholarshipId:id
             }
          })
         countYear.push({year:uniqueChars[i],value:addData});
     }
   res.json(countYear.sort())
 })


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

let sorted = uniqueChars.sort();
let countYear = [];

    for(var i=0; i<sorted.length; i++){
         const addData = await Scholarsrecords.count({
            where:{
                year:sorted[i]
            }
         })
        countYear.push({year:uniqueChars[i],value:addData});
    }
  res.json(countYear.sort())
})

router.post("/update/:id", async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const updateRows = await Scholars.update(data, {
      where: {
        id: id,
      },
    });

    const updateRows1 = await Scholarsrecords.update(data, {
        where: {
          studentno: data.studentno,
        },
      });
  
    res.json(updateRows);
  });


  
  router.get('/count/list/:id',async (req,res,next)=>{
    const id = req.params.id;
    const data = await Scholarsrecords.count({where:{studentno:id}});
   res.json(data)
  });

  router.get('/fullscholarsrecord',async(req,res,next)=>{
    const data = await Scholars.findAll();
    res.json(data);
  })
  router.get('/fullrecord',async(req,res,next)=>{
  
  const dt = new Date();
    const data = await Scholars.findAll();
    // const records = await Scholarsrecords.findAll();
    let newData = [];
    for(var i=0; i<data.length; i++){
      const size = await Scholarsrecords.count({
        where:{studentno:data[i].studentno,year:dt.getFullYear()}
      });
      newData.push({id:data[i].id,studentno:data[i].studentno,surname: data[i].surname, firstname:data[i].firstname,middlename:data[i].middlename,course:data[i].course,department:data[i].department,count:size});
    }


    res.json(newData);
  });

router.post('/delete/:id',async(req,res,next)=>{
  const id = req.params.id;

 const deletedRow = await Scholarsrecords.destroy({
    where:{id:id}
  });

  res.json(deletedRow);
})


module.exports = router;