const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('establishment', {
    id:{// Este sería el CUIT/CUIL, correcto?
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logoImage:{
        type: DataTypes.STRING,
    },
    rating:{
        type: DataTypes.FLOAT,
    },
    timeActiveFrom:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timeActiveTo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    responsable_id: {
        type: DataTypes.STRING,
        allowNull:false
    }

  });
};