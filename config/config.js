//ANCHOR - Local configure
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

require('dotenv').config();  // Memuat variabel lingkungan dari file .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || 'sipus',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',  // Ubah menjadi 'postgres' jika menggunakan PostgreSQL
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',  // Ubah menjadi 'postgres' jika menggunakan PostgreSQL
    logging: false,
  },
};
