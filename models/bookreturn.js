'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookReturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookReturn.init({
    member_id: DataTypes.STRING,
    book_collection_id: DataTypes.STRING,
    details: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BookReturn',
  });
  return BookReturn;
};