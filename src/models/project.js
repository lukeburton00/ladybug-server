const { sequelize, DataTypes } = require('../db/db.js');
const User = require('./user.js');

const Project = sequelize.define( "project", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }

}, {timestamps: true}, )

module.exports = Project;