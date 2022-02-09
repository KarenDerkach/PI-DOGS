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
    height_min:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    height_max:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    weight_min:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    weight_max:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,

    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    //createInBd es un atributo q me permitira distinguir cuando cree un animal mediante mi BD y no traido desde la API
    createInBd:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    // isFavourite:{
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false,
    // },
  },{timestamps: false});
};
