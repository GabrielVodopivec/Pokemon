require('dotenv').config();
const { Sequelize } = require('sequelize');
const models = require('./models');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize( `postgres://postgres:n123456@localhost/pokemondb`, { 
          logging: false, 
          native: false
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