const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('order_detail', {
    name:{
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaulValue:1
    }
  });
};