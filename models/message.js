'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Message.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        from: DataTypes.INTEGER,
        target_id: DataTypes.INTEGER,
        media: DataTypes.BOOLEAN,
        message: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'messages',
    });
    return Message;
};