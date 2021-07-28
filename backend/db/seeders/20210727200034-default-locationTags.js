"use strict";

const locationTags = [];
// const added = [];
// for (let i = 0; i < 50; i++) {
//   const tagId = Math.floor(Math.random() * 6) + 1;
//   if (added.includes(`${tagId} ${i + 1}`)) i--;
//   else {
//     const locationTag = {
//       tagId: tagId,
//       locationId: i + 1,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     locationTags.push(locationTag);
//     added.push(`${tagId} ${i + 1}`);
//   }
// }

for (let i = 0; i < 18; i++) {
  let tagId;
  if (i < 3) tagId = 6;
  else if (i >= 3 && i < 6) tagId = 5;
  else if (i >= 6 && i < 9) tagId = 4;
  else if (i >= 9 && i < 12) tagId = 3;
  else if (i >= 12 && i < 15) tagId = 2;
  else tagId = 1;

  const locationTag = {
    tagId: tagId,
    locationId: i + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  locationTags.push(locationTag);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("LocationTags", locationTags, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("LocationTags", {
      id: { [Sequelize.Op.gt]: 0 },
    });
  },
};
