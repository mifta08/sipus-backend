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
      // define association here
    }
  }
  Borrowing.init({
    member_id: DataTypes.STRING,
    book_collection_id: DataTypes.STRING,
    details: DataTypes.STRING,
    borrowing_date: DataTypes.DATE,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Borrowing',
  });
  return Borrowing;
};