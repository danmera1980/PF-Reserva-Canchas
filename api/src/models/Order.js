const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('order', {
        status:{  
            type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
            allowNull: false
        },
        payment_id:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        payment_status:{
            type: DataTypes.STRING,
            defaultValue: ""
        },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    });
};