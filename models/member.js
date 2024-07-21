'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    member_id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    number_phone: DataTypes.STRING,
    library_id: DataTypes.STRING,
    role: DataTypes.ENUM('user')
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};