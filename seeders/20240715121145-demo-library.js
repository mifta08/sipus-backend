'use strict';

const library = require('../models/library');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Libraries', [
      {
        library_id: '',
        library_name: 'Tadika Mesra',
        address: 'Jalan pondok kelapa, Kuningan, Jakarta Barat',
        employee_id: '1',
        isbn: '978-3-16-148410-0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Libraries', null, {});
  }
};
