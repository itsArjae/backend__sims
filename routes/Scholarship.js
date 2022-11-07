const express = require("express");
const router = express.Router();
const scholarshipController = require("../controller/scholarship/scholarship.controller");
const { Scholarship, Scholarsrecords } = require("../models");

router.post("/create", scholarshipController.saveScholarship);
router.get("/fetch", scholarshipController.getScholarship);

router.get("/fetch/id/:id", scholarshipController.getScholarshipInfo);

router.get('/fetch/list/:id',scholarshipController.getScholarshipList);


router.get("/fetch/count", async (req, res, next) => {
  const size = await Scholarship.count();
  res.json(size);
});

router.get("/fetch/countall", async (req, res, next) => {
  const size = await Scholarship.count();
  res.json(size);
});

router.get("/count/cat", async (req, res, next) => {
  
  const year = new Date();
  let governorSize = 0;
  let congSize = 0;
  let mayorSize = 0;
  let skSize = 0;
  let finAssSize = 0;
  let govSize = 0;
  let ngoSize = 0;
  let othersSize = 0;

    const active = await Scholarsrecords.findAll({
      year:year.getFullYear()
    });
    let data = [];
    const scholarship = await Scholarship.findAll();

    for(var i = 0; i<scholarship.length; i++){
      let size = await Scholarsrecords.count({
        where:{ScholarshipId:scholarship[i].id,
        year:year.getFullYear()
        }
      });

      if(scholarship[i].category == "Governor"){
        governorSize = governorSize + size;
      }
      if(scholarship[i].category == "Congressman"){
        congSize = congSize + size;
      }
      if(scholarship[i].category == "Mayor"){
        mayorSize = mayorSize + size;
      }
      if(scholarship[i].category == "SK"){
        skSize = skSize + size;
      }
      if(scholarship[i].category == "Financial Assistance"){
        finAssSize = finAssSize + size;
      }
      if(scholarship[i].category == "Government"){
        govSize = govSize + size;
      }
      if(scholarship[i].category == "NGO"){
        ngoSize = ngoSize + size;
      }
      if(scholarship[i].category == "Others"){
        othersSize = othersSize + size;
      }

    }


  res.json([
  {name:"Governor",value:governorSize},
  {name:"Congressman",value:congSize},
  {name:"Mayor",value:mayorSize},
  {name:"SK",value:skSize},
  {name:"Financial Assistance",value:finAssSize},
  {name:"Government",value:govSize},
  {name:"NGO",value:ngoSize},
  {name:"Others",value:othersSize}
])
  
});

router.post("/update/duplication/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const stat = data.allowduplication;
  console.log(data);
  const updateRows = await Scholarship.update(
    {
      allowduplication: stat,
    },
    {
      where: { id: id },
    }
  );

  res.json(updateRows);
});

router.post("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const updateRows = await Scholarship.update(data, {
    where: {
      id: id,
    },
  });

  res.json(updateRows);
});

router.post('/delete/:id',async(req,res,next)=>{
  const id = req.params.id;

  const count = await Scholarship.destroy({where:{id:id}})
  const temp = await Scholarsrecords.destroy({
    where: { ScholarshipId:id }
  })
  res.json(count);
});

module.exports = router;
