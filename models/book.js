'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.BookCollection, {
        foreignKey: 'isbn',
        sourceKey: 'isbn',
        as: 'bookCollection'
      });
    }
  }
  Book.init({
    isbn: DataTypes.STRING,
    book_tittle: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};