const axios = require('axios');
const { pokemon, tipo } = require('../db');

const apiCall = () => {
    let pokeId1 = 1;
    let arrDetail = [];
    while( pokeId1 <= 100) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    return arrDetail.flat();
}

const apiInfo = Promise.all( apiCall())
                .then(( ApiResponse ) =>{
                    return ApiResponse.map(( el ) => el.data);
                })
                .then(( ApiResponse ) => {
                    return ApiResponse.flatMap(( el )=> {
                        return {
                            id: el.id,
                            name: el.name,
                            img: el.sprites.other.home.front_default,
                            types: el.types.map(( element ) => {
                                return {
                                    name: element.type.name
                                }
                            }),
                            hp: el.stats[0].base_stat,
                            attack: el.stats[1].base_stat,
                            defense: el.stats[2].base_stat,
                            height: el.height,
                            weight: el.weight

                        }
                    });
                })
                .then(( ApiResponse ) => {
                    console.log( 'ApiInfo Ready!' );
                    return ApiResponse;
                })
                .catch(( error ) => {
                    console.log( error );
                });

const dbInfo = () => {
    return pokemon.findAll({
                include: [{
                    model: tipo,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(( infoDb ) => {
                console.log( 'DbInfo Ready!' )
                return infoDb;
            })
            .catch(( error ) => {
                console.log( error )
            });
};

const getPokemons = () => {
    return Promise.all( [dbInfo(), apiInfo] )
            .then(( resp ) => {
                return [...resp[0], ...resp[1]];
            })
            .catch(( error ) => {
                console.log( error );
            })
};
   
module.exports = getPokemons;
