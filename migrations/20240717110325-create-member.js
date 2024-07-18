'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      number_phone: {
        type: Sequelize.STRING
      },
      library_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Libraries', // Nama tabel yang direferensikan
          key: 'library_id' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      role: {
        type: Sequelize.ENUM('user')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};