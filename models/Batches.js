module.exports = (sequelize, DataTypes) => {
  const Batches = sequelize.define("Batches", {
    batchname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchyear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  return Batches;
};
