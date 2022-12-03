module.exports = (sequelize, DataTypes) => {
  const Announcements = sequelize.define("Announcements", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateposted:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    preparedby:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Announcements;
};
