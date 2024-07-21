'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookReturns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Members', // Nama tabel yang direferensikan
          key: 'member_id' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      book_collection_id: {
        type: Sequelize.STRING,
        references: {
          model: 'BookCollections', // Nama tabel yang direferensikan
          key: 'book_collection_id' // Kolom yang direferensikan
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      details: {
        type: Sequelize.STRING
      },
      due_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('BookReturns');
  }
};