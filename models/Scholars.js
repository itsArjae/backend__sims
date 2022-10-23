
module.exports = (sequelize, DataTypes) => {
  const Scholars = sequelize.define("Scholars", {
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suffix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barangay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearlevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });


  return Scholars;
};

/*

module.exports = (sequelize, DataTypes) => {
  const Scholars = sequelize.define("Scholar", {
    
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /*suffix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barangay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearlevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
  });

  /*Scholars.associate = (models) => {
    Scholars.hasMany(models.Scholarsrecords, {
      onDelete: "Cascade",
    });
  };



  return Scholars;
};


*/