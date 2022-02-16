const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('court', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shiftLength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    sport: { 
        type: DataTypes.ENUM('Basquet', 'Futbol 11', 'Futbol 7', 'Futbol 5', 'Tenis', 'Padel', 'Handbol', 'Squash'),
        allowNull: false
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue:["https://i.ibb.co/LSVSVLG/cancha.jpg"]
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });
};