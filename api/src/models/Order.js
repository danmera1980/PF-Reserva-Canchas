const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('order', {
    price: {
      type: DataTypes.INTEGER,
    }
  });
};