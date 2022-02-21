
require('dotenv').config();
const { Sequelize } = require('sequelize');
const models = require('./models');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

Object.values( models ).forEach(( model ) => model( sequelize ));

const { pokemon, types } = sequelize.models;
pokemon.belongsToMany( types, { through: "pokemon_tipo" } );
types.belongsToMany( pokemon, { through: "pokemon_tipo" } );

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { product, user } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
















// // Importo las funciones que definen los modelos
// const models = require('./models');
// // models ={ pokemon: pokemon( sequelize ), tipo: tipo( sequelize ) }
// // Le inyecto la conexion (sequelize) a todos los modelos

// Object.values( models ).forEach(( model ) => model( sequelize ));
// // Object.values( models ) me devuelve un array con las funciones creadoras de modelos.
// // En sequelize.models están todos los modelos importados como propiedades.

// // Los extraigo haciendo destructuring
// const { pokemon, tipo } = sequelize.models;

// // Los relaciono
// pokemon.belongsToMany( tipo, { through: "pokemon_tipo" } );
// tipo.belongsToMany( pokemon, { through: "pokemon_tipo" } );

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
// };