'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 50]
      },
    },
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    address: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [50, 1000]
      },
    },
    userId: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, { foreignKey: 'userId' });
    Location.hasMany(models.Booking, { foreignKey: 'locationId' });
    Location.hasMany(models.Review, { foreignKey: 'locationId' });
    Location.belongsToMany(models.Tag, {
      foreignKey: 'locationId',
      through: 'LocationTag',
      otherKey: 'tagId',
    });
  };
  return Location;
};
