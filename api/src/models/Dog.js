const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID, //sequlize te da un ID random, sirve p/ q cuando llame al id mediante la url no se pise con el de la base de datos//PARA EVITAR COLISIONES
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING, //Respeto la forma en por como m viene en la base de datos
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING, //Respeto la forma en por como m viene en la base de datos
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,

    },//createInBd es un atributo q me permitira distinguir cuando cree un animal mediante mi BD y no traido desde la API
    createInBd:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },{timestamps: false});
};
