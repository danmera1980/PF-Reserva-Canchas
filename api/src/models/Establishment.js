const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("establishment", {

    cuit: {
      // Este sería el CUIT/CUIL, correcto?
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoImage: {
      type: DataTypes.STRING,
    },
    timeActiveFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeActiveTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });
};
