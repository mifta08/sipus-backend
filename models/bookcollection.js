'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookCollection.hasMany(models.Borrowing, {
        foreignKey: 'book_collection_id',
        sourceKey: 'book_collection_id',
        as: 'borrowing'
      });

      BookCollection.belongsTo(models.Library, {
        foreignKey: 'library_id',
        as: 'library'
      });

      BookCollection.belongsTo(models.Book, {
        foreignKey: 'isbn',
        targetKey: 'isbn',
        as: 'book'
      });
    }
  }
  BookCollection.init({
    book_collection_id: DataTypes.STRING,
    library_id: DataTypes.STRING,
    isbn: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BookCollection',
  });
  return BookCollection;
};