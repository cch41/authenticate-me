"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tags",
      [
        {
          name: "Hidden gems",
          image: "https://coastal-camper.s3.amazonaws.com/hidden-gems.png",
          phrase: "Sites on the rise",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wide open spaces",
          image: "https://coastal-camper.s3.amazonaws.com/wide-open-spaces.jpg",
          phrase: "Privacy and seclusion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pet-friendly spots",
          image: "https://coastal-camper.s3.amazonaws.com/pet-friendly.png",
          phrase: "Bring your best friend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Small waves",
          image: "https://coastal-camper.s3.amazonaws.com/small-waves.png",
          phrase: "0-2 feet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Medium waves",
          image: "https://coastal-camper.s3.amazonaws.com/medium-waves.png",
          phrase: "3-5 feet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Big waves",
          image: "https://coastal-camper.s3.amazonaws.com/big-waves-tag.png",
          phrase: "6+ feet",
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
