'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('invites', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        status: {
            type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
            allowNull: false,
            defaultValue: 'pending'
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },

    async down (queryInterface) {
        await queryInterface.dropTable('invites');
    }
};
