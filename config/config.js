const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_URI
} = process.env

// ANCHOR connect to db locally
// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "sipus",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "sipus",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

// ANCHOR connect to remote db
const sequelize = DB_URI
  ? new Sequelize(DB_URI, {
    define: { timestamps: false },
    dialect: 'mysql'
  })
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT || 'mysql',
    port: DB_PORT,
    define: { timestamps: false }
  });

module.exports = sequelize;