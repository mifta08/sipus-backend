'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Library.init({
    library_id: {
      type: DataTypes.STRING,
    },
    library_name: DataTypes.STRING,
    address: DataTypes.STRING,
    employee_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Library',
    hooks: {
      beforeCreate: (library, options) => {
        if (!library.library_id) { // Jika library_id kosong
          const generateLibraryId = (libraryName, date) => {
            const namePrefix = libraryName.substring(0, 3).toUpperCase();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return `${namePrefix}-${hours}-${minutes}-${seconds}`;
          };
          library.library_id = generateLibraryId(library.library_name, library.createdAt);
          console.log(`Generated library_id: ${library.library_id}`);
        }
      },
      beforeUpdate: (library, options) => {
        if (library.changed('library_name') || library.changed('createdAt')) { // Jika library_name berubah
          const generateLibraryId = (libraryName, date) => {
            const namePrefix = libraryName.substring(0, 3).toUpperCase();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return `${namePrefix}-${hours}-${minutes}-${seconds}`;
          };

          const newLibraryId = generateLibraryId(library.library_name, library.createdAt);
          library.library_id = newLibraryId

        }
      }
    }
  });
  return Library;
};