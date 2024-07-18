'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookCollections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      isbn: {
        type: Sequelize.STRING,
        references: {
          model: 'Books', // Nama tabel yang direferensikan
          key: 'isbn' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('BookCollections');
  }
};