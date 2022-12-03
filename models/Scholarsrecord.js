module.exports = (sequelize, DataTypes) => {
  const Scholarsrecords = sequelize.define("Scholarsrecords", {
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
    ScholarshipId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    BatchId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    course:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    department:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  



  return Scholarsrecords;
};
