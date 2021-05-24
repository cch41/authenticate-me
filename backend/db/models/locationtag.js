'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationTag = sequelize.define('LocationTag', {
    locationId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  LocationTag.associate = function(models) {
    // associations can be defined here
  };
  return LocationTag;
};
