const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    phone: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    hasEstablishment: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
};
