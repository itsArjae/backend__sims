module.exports = (sequelize, DataTypes) => {
  const Scholarshiprecords = sequelize.define("Scholarshiprecords", {
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearlevel:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    scholarshipabbrev:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    
   
  });



  return Scholarshiprecords;
};
