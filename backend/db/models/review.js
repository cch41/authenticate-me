"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      recommends: DataTypes.BOOLEAN,
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Location, { foreignKey: "locationId" });
  };
  return Review;
};
