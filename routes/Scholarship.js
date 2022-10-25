const express = require("express");
const router = express.Router();
const scholarshipController = require("../controller/scholarship/scholarship.controller");
const { Scholarship, Scholarsrecords } = require("../models");

router.post("/create", scholarshipController.saveScholarship);
router.get("/fetch", scholarshipController.getScholarship);

router.get("/fetch/id/:id", scholarshipController.getScholarshipInfo);

router.get("/fetch/count", async (req, res, next) => {
  const size = await Scholarship.count();
  res.json(size);
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
    where:{ScholarshipId:id}
  })
  res.json(count);
});

module.exports = router;
