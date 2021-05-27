'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { name: 'Hidden gems', image: 'hidden-gems.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Warm weather', image: 'warm-weather.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Big waves', image: 'big-waves.jpg', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', {
      id: { [Sequelize.Op.gt]: 0}
    });
  }
};
