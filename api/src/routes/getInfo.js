const axios = require('axios');
const { pokemon, types } = require('../db');

const apiCall1 = () => {
    let pokeId1 = 1;
    let arrDetail = [];
    while( pokeId1 <= 30) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    console.log('array 1 listo')
    return arrDetail;
}
const apiCall2 = () => {
    let pokeId1 = 331;
    let arrDetail = [];
    while( pokeId1 <= 360) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
    console.log('array 2 listo')
    return arrDetail;
}
const apiCall3 = () => {
    let pokeId1 = 101;
    let arrDetail = [];
    while( pokeId1 <= 110) {  
        arrDetail.push( axios(`https://pokeapi.co/api/v2/pokemon/${pokeId1}/`) );
        pokeId1++;
    }
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
                            velocidad: el.stats[5].base_stat,
                            height: el.height,
                            weight: el.weight

                        }
                    });
                })
                .then(( ApiResponse ) => {
                    console.log( 'ApiInfo 3 Ready!' );
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
             
const dbInfo = () => {
    return pokemon.findAll({
                include: [{
                    model: types,
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

const morePokemons = () => {
    return apiInfo3
}

const getPokemons = () => {
    
        return Promise.all( [dbInfo(), apiInfo1, apiInfo2/* , apiInfo3, apiInfo4 */] )
            .then(( resp ) => {
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
