"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tags",
      [
        {
          name: "Hidden gems",
          image: "https://coastal-camper.s3.amazonaws.com/hidden-gems.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wide open spaces",
          image: "https://coastal-camper.s3.amazonaws.com/wide-open-spaces.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pet friendly",
          image: "https://coastal-camper.s3.amazonaws.com/pet-friendly.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Small waves",
          image: "https://coastal-camper.s3.amazonaws.com/small-waves.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Medium waves",
          image: "https://coastal-camper.s3.amazonaws.com/medium-waves.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Big waves",
          image: "https://coastal-camper.s3.amazonaws.com/big-waves-tag.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
