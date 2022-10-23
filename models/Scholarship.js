module.exports = (sequelize, DataTypes) => {
  const Scholarships = sequelize.define("Scholarship", {
    scholarshipname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowduplication: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Scholarships.associate = (models) => {
    Scholarships.hasMany(models.Scholarshiprecords, {
      onDelete: "Cascade",
    });
    Scholarships.hasMany(models.Batches, {
      onDelete: "Cascade",
    });
    Scholarships.associate = (models) => {
      Scholarships.hasMany(models.Scholarsrecords, {
        onDelete: "Cascade",
      });
    };
  };


  return Scholarships;
};
