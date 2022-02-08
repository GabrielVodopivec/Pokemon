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
    img: {
      type: DataTypes.STRING
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
    },
    bulked: {
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  },{
    sequelize,
    modelName: "pokemon"
  });
};

const types = ( sequelize ) => {
  class Types extends Model {};
  Types.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "types"
  })
}

const models = {
  pokemon,
  types
}

module.exports = models;