'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            from: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            target_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            media: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            message: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('messages');
    }
};