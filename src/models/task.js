const { sequelize, DataTypes } = require('../db/db.js');

const Task = sequelize.define( "task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('to_do', 'doing', 'done'),
        allowNull: false,
        defaultValue: 'to_do'
    },
    external_link: {
        type: DataTypes.STRING,
        allowNull: true,
        isUrl: true
    },
}, {timestamps: true}, )

module.exports = Task;