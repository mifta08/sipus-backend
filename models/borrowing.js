'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Borrowing.belongsTo(models.BookCollection, {
        foreignKey: 'book_collection_id',
        targetKey: 'book_collection_id',
        as: 'bookCollection'
      });

      Borrowing.belongsTo(models.Member, {
        foreignKey: 'member_id',
        targetKey: 'member_id',
        as: 'member'
      });
    }
  }
  Borrowing.init({
    member_id: DataTypes.STRING,
    book_collection_id: {
      type: DataTypes.STRING,
      references: {
        model: 'BookCollections',
        key: 'book_collection_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    details: DataTypes.STRING,
    borrowing_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    status: DataTypes.ENUM('borrowed', 'returned')
  }, {
    sequelize,
    modelName: 'Borrowing',
    hooks: {
      afterCreate: async (borrowing, options) => {
        console.log('Hook afterCreate triggered');
        const { BookCollection } = sequelize.models;
        const [updated] = await BookCollection.update(
          { status: false },
          { where: { book_collection_id: borrowing.book_collection_id } }
        );
        console.log(`BookCollection status updated: ${updated}`);
      },
      afterUpdate: async (borrowing, options) => {
        const { BookCollection } = sequelize.models;
        if (borrowing.status === 'returned') {
          await BookCollection.update(
            { status: true },
            { where: { book_collection_id: borrowing.book_collection_id } }
          );
        } if (borrowing.status === 'borrowed') {
          await BookCollection.update(
            { status: false },
            { where: { book_collection_id: borrowing.book_collection_id } }
          );
        }
      }
    }
  });
  return Borrowing;
};