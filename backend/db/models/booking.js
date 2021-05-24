'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    date: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Booking;
};
