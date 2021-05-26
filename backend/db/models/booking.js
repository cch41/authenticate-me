'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    guests: DataTypes.INTEGER,
    checkIn: DataTypes.STRING,
    checkOut: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Location, { foreignKey: 'locationId' });
  };
  return Booking;
};
