'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: "Miftahul",
        employee_id: "1",
        address: "Kos Mustafa",
        email: "miftahul@gmail.com",
        password: "Miftahul@123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
