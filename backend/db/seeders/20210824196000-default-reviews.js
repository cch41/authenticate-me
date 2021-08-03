"use strict";
const faker = require("faker");

const reviews = (function makeReviews() {
  const newReviews = [];
  for (let i = 1; i < 250; i++) {
    newReviews.push({
      content: faker.lorem.sentence() + " " + faker.lorem.sentence(),
      userId: Math.floor(Math.random() * 100) + 1,
      locationId: Math.floor(Math.random() * 18) + 1,
      recommends: Math.random() > 0.2 ? true : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return newReviews;
})();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reviews", reviews, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Reviews");
  },
};
