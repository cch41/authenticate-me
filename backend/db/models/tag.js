"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      phrase: DataTypes.STRING,
    },
    {}
  );
  Tag.associate = function (models) {
    Tag.belongsToMany(models.Location, {
      foreignKey: "tagId",
      through: "LocationTag",
      otherKey: "locationId",
    });
  };
  return Tag;
};
