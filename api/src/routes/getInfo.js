const axios = require('axios');
const { pokemon, types } = require('../db');

const apiCall1 = () => {
    let pokeId1 = 1;
    let arrDetail = [];
    while( pokeId1 <= 30) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    console.log('Array N°1 Ok')
    return arrDetail;
}
const apiCall2 = () => {
    let pokeId1 = 331;
    let arrDetail = [];
    while( pokeId1 <= 360) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    console.log('Array N°2 OK')
    return arrDetail;
}
const apiCall3 = () => {
    let pokeId1 = 101;
    let arrDetail = [];
    while( pokeId1 <= 130) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    console.log("Array N°3 OK")
    return arrDetail;
}
/* const apiCall4 = () => {
    let pokeId1 = 301;
    let arrDetail = [];
    while( pokeId1 <= 325) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    return arrDetail;
} */

const apiInfo1 = Promise.all( apiCall1())
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
                    console.log( 'ApiInfo 1 Ready!' );
                    return ApiResponse;
                })
                .catch(( error ) => {
                    /* console.log( error ); */
                });
const apiInfo2 = Promise.all( apiCall2())
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
                    console.log( 'ApiInfo 2 Ready!' );
                    return ApiResponse;
                })
                .catch(( error ) => {
                    /* console.log( error ); */
                });

const apiInfo3 = Promise.all( apiCall3())
                .then(( ApiResponse ) =>{
                    return ApiResponse.map(( el ) => el.data);
                })
                .then(( ApiResponse ) => {
                    return ApiResponse.flatMap(( el )=> {
                        return {
                            
                            name: `${el.name} ( Bulked )`,
                            img: el.sprites.other.dream_world.front_default,
                            types: el.types.map(( element ) => {
                                return {
                                    name: element.type.name
                                }
                            }),
                            hp: el.stats[0].base_stat,
                            attack: el.stats[1].base_stat,
                            defense: el.stats[2].base_stat,
                            velocidad: el.stats[5].base_stat,
                            height: el.height,
                            weight: el.weight

                        }
                    });
                })
                .then(( ApiResponse ) => {
                    console.log( 'Pokemons to Bulk Ready!' );
                    return ApiResponse;
                })
                .catch(( error ) => {
                    console.log( error );
                });

/* const apiInfo4 = Promise.all( apiCall4())
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
                    console.log( 'ApiInfo 4 Ready!' );
                    return ApiResponse;
                })
                .catch(( error ) => {
                    console.log( error );
                });
 */   
             
const dbInfo = async () => {
    try {

        const db =  await pokemon.findAll({
            include: [{
                    model: types,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            /* .then(( infoDb ) => {
                console.log( 'DbInfo Ready!' )
                return infoDb;
            })
            .catch(( error ) => {
                console.log( error )
            }); */
            return db;
        } catch ( error ) {
            console.log( error )
        }
};

const morePokemons = () => {
    return apiInfo3
}

const getPokemons = () => {
    
    const allPokes = Promise.all( [dbInfo(), apiInfo1, apiInfo2/* , apiInfo3, apiInfo4 */] )
        .then(( resp ) => {
            console.log("Info merged and Ready to use...")
            return [...resp[0], ...resp[1], ...resp[2]/* , ...resp[3], ...resp[4] */];
        })
        .catch(( error ) => {
            /* console.log( error ) */
            return dbInfo()
            .then(( response ) => {
                return response
            })
            .catch(( error ) => {
                console.log( error )
            });
        })
    return allPokes;
    
};

const getTypes = () => {
    return axios("https://pokeapi.co/api/v2/type")
        .then(( response ) => {
            return response.data.results.map(( type ) => {
                return {
                    name: type.name
                }
            })
        })
            
        .then(( response ) => {
            console.log("Types ready to go!")
        return types.bulkCreate( response )
        })
        .catch(( error ) => {
            console.log( error )
        })
}
const info = {
    getPokemons,
    morePokemons,
    getTypes
}
module.exports = info;
