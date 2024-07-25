const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit with an error code
    });

module.exports = sequelize;
