const express = require("express");
const {
  Scholarship,
  Scholarshiprecords,
  Scholars,
  Scholarsrecords,
  Batches,
} = require("../../models");

const saveScholars = async (req, res, next) => {
  const add = req.body;
  const {
    surname,
    firstname,
    middlename,
    suffix,
    barangay,
    municipality,
    country,
    postalcode,
    age,
    sex,
    department,
    yearlevel,
    contactno,
    email,
    studentno,
    ScholarshipId,
    batchid,
    province,
    course,
  } = req.body;

  const scholarsData = {
    surname: surname,
    firstname: firstname,
    middlename: middlename,
    suffix: suffix,
    barangay: barangay,
    municipality: municipality,
    province: province,
    country: country,
    postalcode: postalcode,
    age: age,
    sex: sex,
    department: department,
    yearlevel: yearlevel,
    studentno: studentno,
    contactno: contactno,
    email: email,
    course: course,
  };

  const foundScholar = await Scholars.findAll({
    where: {
      studentno: studentno,
    },
  });

  const scholarshipData = await Scholarship.findByPk(ScholarshipId);
  const batchData = await Batches.findByPk(batchid);
  const { batchyear } = batchData;
  const { allowduplication, abbreviation } = scholarshipData;

  
  const scholarRecords = await Scholarsrecords.findAll({
    where: {
      year: batchyear,
      studentno: studentno,
      
    },
  });

  const scholarCurrent = await Scholarsrecords.findAll({
    where: {
      year: batchyear,
      studentno: studentno,
      ScholarshipId:ScholarshipId
    },
  });

  const curScholar = await Scholars.findOne({
    where:{studentno:studentno}
  })
  let scholarDataToSave = {};
if(!curScholar){
  scholarDataToSave = {
    year: batchyear,
    studentno: studentno,
    yearlevel: yearlevel,
    scholarshipabbrev: abbreviation,
    ScholarshipId: ScholarshipId,
    BatchId: batchid,
    surname: surname,
    firstname: firstname,
    middlename: middlename,
    course: course,
    department: department,
    
  };
}else{
  scholarDataToSave = {
    year: batchyear,
    studentno: studentno,
    yearlevel: yearlevel,
    scholarshipabbrev: abbreviation,
    ScholarshipId: ScholarshipId,
    BatchId: batchid,
    surname: curScholar.surname,
    firstname: curScholar.firstname,
    middlename: curScholar.middlename,
    course: curScholar.course,
    department: curScholar.department,
    
  };
}
 

  const dt = new Date();

  if (foundScholar.length == 0) {
    await Scholars.create(scholarsData);
    if (!allowduplication) {
      if (scholarRecords.length > 0) {
        return res.json({
          message: "This scholar exist in another scholarship",
          err:400
        });
      } else {
        await Scholarsrecords.create(scholarDataToSave);
         const count = await Scholarsrecords.count({
          where:{studentno:studentno,year:dt.getFullYear()}
        })
        const update = await Scholars.update({
          count:count,
          updated:dt.getFullYear(),
          year:batchyear
        },
        {
          where:{studentno:studentno}
        }
        );
        return res.json({ message: "Scholars Save Successfully" });
      }
    } else {

      if(scholarCurrent.length>0){
        return res.json({
          message: "This scholar already exist",
          err:400
        });
      }
      else{
        await Scholarsrecords.create(scholarDataToSave); 
        const count = await Scholarsrecords.count({
          where:{studentno:studentno,year:dt.getFullYear()}
        })
        const update = await Scholars.update({
          count:count,
          updated:dt.getFullYear(),
          year:batchyear
        },
        {
          where:{studentno:studentno}
        }
        );
        return res.json({ message: "Scholars Save Successfully" });
      }

    
    }
  }
  if (foundScholar.length > 0) {
    //  res.json({success:"old student"});
    if (!allowduplication) {
      if (scholarRecords.length > 0) {
        return res.json({
          message: "This scholar exist in another scholarship",
          err:400
        });
      } else {
        await Scholarsrecords.create(scholarDataToSave);
        const count = await Scholarsrecords.count({
          where:{studentno:studentno,year:dt.getFullYear()}
        })
        const update = await Scholars.update({
          count:count,
          updated:dt.getFullYear(),
          year:batchyear
        },
        {
          where:{studentno:studentno}
        }
        );
        return res.json({ message: "Scholars Save Successfully" });
      }
    } else {
      if(scholarCurrent.length>0){
        return res.json({
          message: "This scholar already exist",
          err:400
        });
      }
      else{
        await Scholarsrecords.create(scholarDataToSave);
        const count = await Scholarsrecords.count({
          where:{studentno:studentno,year:dt.getFullYear()}
        });

      
        const update = await Scholars.update({
          count:count,
          updated:dt.getFullYear(),
          year:batchyear
        },
        {
          where:{studentno:studentno}
        }
        );
        return res.json({ message: "Scholars Save Successfully" });
      }
    }
  }
};

const getScholarsBatch = async (req, res, next) => {
  const schoid = req.params.id;
  const batchid = req.params.bid;
  const scholarsbatch = await Scholarsrecords.findAll({
    where: {
      ScholarshipId: schoid,
      BatchId: batchid,
    },
  });
  res.json(scholarsbatch);
  //res.json({s:schoid,n:batchid});
};

const getAllScholars = async (req, res, next) => {
  const scholarsData = await Scholars.findAll();
  res.json(scholarsData);
};

const getScholarsInfo = async (req,res,next) => {
  const id = req.params.id;
  const scholarsData = await Scholars.findAll({
    where:{
      id:id
    }
  })

  res.json(scholarsData);
}

const getScholarRecord = async(req,res,next) =>{
  const id = req.params.id;
  const scholarsrecord = await Scholarsrecords.findAll({
    where:{
      studentno:id
    }
  })
  res.json(scholarsrecord);
}

const tryy = (req,res,next) =>{
res.json({messaage:"sdd"})
}

const getStatistics = async(req,res,next) => {
    const schoid = req.params.id;
    const dt = new Date();
    const year = dt.getFullYear();

    const depcite = "CITE";
    const depcit = "CIT";
    const depcba = "CBA";
    const depcoed = "COED";
     const cite = await Scholarsrecords.findAll({
      where:{
        year:year,
        department:depcite,
        ScholarshipId:schoid
      }
     })
     const cit = await Scholarsrecords.findAll({
      where:{
        year:year,
        department:depcit,
        ScholarshipId:schoid
      }
     })
     const cba = await Scholarsrecords.findAll({
      where:{
        year:year,
        department:depcba,
        ScholarshipId:schoid
      }
     })
     const coed = await Scholarsrecords.findAll({
      where:{
        year:year,
        department:depcoed,
        ScholarshipId:schoid
      }
     });

  res.json([{name:"CITE",value:cite.length},{name:"CIT",value:cit.length},{name:"COED",value:coed.length},{name:"CBA",value:cba.length}]);
}

const ScholarReports = async(req,res,next)=>{
    
}




module.exports = { saveScholars, getScholarsBatch,getAllScholars,getScholarsInfo,getScholarRecord,getStatistics};
