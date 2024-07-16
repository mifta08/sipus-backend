'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', [
      {
        name: "Miftahul",
        employee_id: "1",
        address: "Kos Mustafa",
        email: "miftahul@gmail.com",
        password: "Mxking150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
