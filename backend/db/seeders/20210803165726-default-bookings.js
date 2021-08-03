"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      {
        guests: 4,
        checkIn: "2020-09-01",
        checkOut: "2020-09-06",
        userId: 1,
        locationId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guests: 8,
        checkIn: "2020-12-11",
        checkOut: "2020-12-18",
        userId: 1,
        locationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guests: 2,
        checkIn: "2021-10-11",
        checkOut: "2021-10-13",
        userId: 1,
        locationId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guests: 3,
        checkIn: "2021-11-19",
        checkOut: "2020-11-25",
        userId: 1,
        locationId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bookings", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
