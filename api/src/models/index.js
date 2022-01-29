const { DataTypes, Model } = require('sequelize');
// Exportamos las funciones que definen los modelos
// Luego le injectamos la conexion a sequelize.
const pokemon = ( sequelize ) => {
  class Pokemon extends Model {};
  Pokemon.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    velocidad: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    fromdb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{
    sequelize,
    modelName: "pokemon"
  });
};

const tipo = ( sequelize ) => {
  class Tipo extends Model {};
  Tipo.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "tipo"
  })
}

const models = {
  pokemon,
  tipo
}

module.exports = models;