"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker");

const fakeUsers = (function generateFakerUsers() {
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
    });
  }
  return users;
})();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        ...fakeUsers,
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
