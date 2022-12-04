
const {Scholars,Users} = require('../../models');
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

  res.json(data);


}

const getUsersInfo = async (req,res,next) => {
  const id = req.params.id;
  const usersData = await Users.findAll({
    where:{
      id:id
    }
  })

  res.json(usersData);
}

module.exports = {userRegister,userLogin,getUsersInfo};