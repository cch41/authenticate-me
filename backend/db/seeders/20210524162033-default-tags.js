'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { name: 'Hidden gems', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Warm weather', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Big waves', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', {
      id: { [Sequelize.Op.gt]: 0}
    });
  }
};
