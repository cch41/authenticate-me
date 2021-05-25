'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    address: DataTypes.STRING,
    unit: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    description: DataTypes.STRING,
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
