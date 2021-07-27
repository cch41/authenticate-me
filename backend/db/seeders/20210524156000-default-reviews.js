"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          content: "Great spot! I caught the best wave of my life here.",
          userId: 1,
          locationId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "Super windy, so the waves were larger than the forecast had anticipated.",
          userId: 2,
          locationId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            "We will be returning asap, and not just because we forgot our camera here...",
          userId: 3,
          locationId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Reviews");
  },
};
