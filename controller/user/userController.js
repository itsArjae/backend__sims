
const {Scholars,Users,Applications} = require('../../models');
const bcryptjs = require('bcryptjs')

const userRegister = async(req,res,next) =>{
  const data = req.body;
  const {studentno,email,password} = data;

  const foundUser = await Scholars.findOne({
    where:{studentno:studentno}
  })

  const foundEmail = await Scholars.findOne({
    where:{email:email}
  })

  if(foundUser){
    res.json({error:"Student Number already Exist"});
    return;
  }

  if(foundEmail){
    res.json({error:"Email already Exist"});
    return;
  }

  await Scholars.create(data);

  const sID = await Scholars.findOne({
    where:{studentno:studentno}
  });
  const newPassword = bcryptjs.hashSync(password, 10);

  const save = {email:email,password:newPassword,studentno:studentno,ScholarId:sID.id}
  await Users.create(save);

  res.json(data);
}

const userLogin = async(req,res,next)=>{

  const data = req.body;
  const {email,password} = data;

  const foundEmail = await Users.findOne({
    where:{email:email}
  });

  if(!foundEmail){
    res.json({error:"Email doesn't exist"});
    return;
  }

  const tempPassword = foundEmail.password;

  const result = bcryptjs.compareSync(password, tempPassword); 

  if(!result){
    res.json({error:"Wrong password"});
    return;
  }
  res.json({uid:foundEmail.id});
}

// const fetchUserInfo = async(req,res,next) =>{
//   const id = 
// }
 

const checkBatches = async(req,res,next) => {
  const bid = req.params.bid;
  const stn = req.params.stn;

  const user = await Users.findOne({
    where:{id:stn}
  })

  const found = await Applications.findOne({
    where:{
      BatchId:bid,
      studentno:user.studentno
    }
  })
  
  if(!found){
    res.json({status:"none"});
    return;
  }

  if(found.status == "pending"){
    res.json({status:"pending"});
    return;
  }

  if(found.status == "rejected"){
    res.json({status:"rejected"});
    return;
  }
  
  re.json({status:"accepted"});
}

const applyBatches = async(req,res,next) => {
  const bid = req.params.bid;
  const stn = req.params.stn;
  const data = req.body;

  const user = await Users.findOne({
    where:{id:stn}
  })

  let save = {studentno:user.studentno,status:"pending",BatchId:bid};


   await Applications.create(save);
  res.json(save);
}
module.exports = {userRegister,userLogin,checkBatches,applyBatches};