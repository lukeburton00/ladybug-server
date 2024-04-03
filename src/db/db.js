const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const env = process.env.NODE_ENV

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    port: config[env].port,
    dialect: config[env].dialect,
    define: {
        underscored: true
      }    
});

const authenticate_connection = async function () {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } 

    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticate_connection();

module.exports = {
    sequelize,
    DataTypes
}
    