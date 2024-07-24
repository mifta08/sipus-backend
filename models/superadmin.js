'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SuperAdmin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    number_phone: DataTypes.STRING,
    role: DataTypes.ENUM('super_admin')
  }, {
    sequelize,
    modelName: 'SuperAdmin',
    hooks: {
      beforeCreate: async (superadmin) => {
        const salt = await bcrypt.genSalt(10);
        superadmin.password = await bcrypt.hash(superadmin.password, salt);
      },
      beforeUpdate: async (superadmin) => {
        const salt = await bcrypt.genSalt(10);
        superadmin.password = await bcrypt.hash(superadmin.password, salt);
      }
    },
  });
  return SuperAdmin;
};