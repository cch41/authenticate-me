'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        content: 'Great spot!',
        userId: 1,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'super windy',
        userId: 2,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'we will be returning asap',
        userId: 3,
        locationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
