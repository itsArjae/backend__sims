module.exports = (sequelize, DataTypes) => {
  const Applications = sequelize.define("Applications", {
    studentno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
  });

  return Applications;
};
