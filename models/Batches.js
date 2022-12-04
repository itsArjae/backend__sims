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
    slot: {
      type: DataTypes.STRING,
      allowNull: false,
    },

   
  });

  
  Batches.associate = (models) => {
    Batches.hasMany(models.Applications, {
      onDelete: "Cascade",
    });
  
  };


  return Batches;
};
