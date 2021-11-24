const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      //  validate: {
      //  notEmpty: true,
      // // //unique: true,
      //  }
    },
  },{timestamps: false});
};