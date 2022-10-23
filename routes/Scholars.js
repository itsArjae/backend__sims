const express = require('express');
const router = express.Router();
const { Scholarsrecords } = require('../models');

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
module.exports = router;