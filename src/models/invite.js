const { sequelize, DataTypes } = require('../db/db.js');
const User = require('./user.js');
const Project = require('./project.js');


const Invite = sequelize.define( "invite", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {timestamps: true}, )

module.exports = Invite;