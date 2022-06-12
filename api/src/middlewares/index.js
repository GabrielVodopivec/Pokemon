const { Op } = require('sequelize');
const axios = require('axios');

const { pokemon, types } = require('../db');
const { getPokemons, getTypes, morePokemons } = require("../routes/getInfo");

const createPokemon = async ( req, res ) => {
    const {
        name,
        img,
        hp,
        attack,
        defense,
        velocidad,
        height,
        weight,
        pokeTypes,
        bulked
    } = req.body;

    try {

        const [ newPokemon, created ] = await pokemon.findOrCreate ({
            where : { name },
            defaults: {
                img,
                hp,
                attack,
                defense,
                velocidad,
                height,
                weight,
                bulked
            }
        })
        const typesDb = await types.findAll({
            where: {
                name: {
                    [Op.in]: pokeTypes
                }
            }
        })
        
        await newPokemon.addTypes( typesDb )

        const pokemonCreated = await pokemon.findOne({
            where: { name },
            include: [{
                model: types,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })

        res
        .status( 200 )
        .send( {wasCreated: created, pokemonCreated } )

    } catch ( error ) {
        console.log(error.original)
        res.status( 400 ).send('Missing data')
    }
    
    getPokemons();

};

const getAllPokemonTypes = ( req, res ) => {
    
    getTypes()
    .then(( response ) => {
        const alphabeticOrder = ( array ) => {
            if ( array.length <= 1) return array;
            let pivot = array[0];
            let left = [];
            let right = [];
            for ( let i = 1; i < array.length; i++ ) {
                if ( array[i].name.toLocaleLowerCase() < pivot.name.toLocaleLowerCase() ) {
                    left.push( array[i] );
                } else {
                    right.push( array[i] );
                }
            };
            return [ ...alphabeticOrder( left ), pivot, ...alphabeticOrder( right ) ]
        }
        const result = alphabeticOrder( response );
        return result;
    })
    .then(( result ) => {
        res.status( 200 ).send( result )
    })
    .catch(() =>{
        res.status( 400 ).send('hubo problemas')
    })
}

const pokeFinder = ( req, res ) => {
    const { name } = req.query;
    
    if ( name ) {
            
            console.log("Buscando entre los pokemones de la Api...")
            axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`)
            .then( response => {          
                return response.data
            })
            .then(( pokemon ) => {
                
                const found = {
                    id: pokemon.id,
                    name: pokemon.name,
                    img: pokemon.sprites.other.home.front_default,
                    attack: pokemon.stats[1].base_stat,
                    types: pokemon.types.map(( element ) => {
                        return {
                            name: element.type.name
                        }
                    })
                }
                return [ found ]
            })
            .then(( pokemono ) => {
                console.log("Encontrado entre los pokemones de la Api")
                res.status( 200 ).send( pokemono )
            })
            .catch( () => {
                console.log("Entre los de la Api no está")
                console.log("Buscando en la base de datos...")
                pokemon.findOne({
                    where: {
                        name: {
                            [Op.iLike]: `${ name }`
                        }
                    },
                    include: [{
                        model: types,
                        attributes: ["name"],
                        through: {
                            attributes: []
                        }
                    }]
                })
                .then(( pokemono ) => {
                    
                    if ( pokemono ) {
                        console.log("Pokemon encontrado en la Base de datos")
                        return res.status( 200 ).send( [ pokemono ] ) 
                    }
                    console.log("En la base de datos tampoco está")
                    console.log("Pokemon not found")
                    res.status( 400 ).send( "Pokemon not found")
                }) 
            })

    } else {
        
        getPokemons()
        .then(( response ) => {
            res.status( 200 ).send( response )
        })
        .catch(( error ) => {
            console.log( error )
            res.status(400).send( 'Something went wrong' )
        })
    }
}

const pokeDetail = ( req, res ) => {

    const { id } = req.params;

    if ( isNaN(id) ) {
        pokemon.findOne({
            where: { id },
            include: [{
                model: types,
                attributes:[ 'name' ],
                through: {
                    attributes:[]
                }
            }]
        })
        .then(( response ) => {
           return res.status( 200 ).send( response )
        })
        .catch(( error ) => {
            console.log( error )
            res.status( 400 ).send( "Invalid ID")
        })

    } else {

        axios(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(( pokemon ) => {
            const info = pokemon.data
            const found = {
                id: info.id,
                name: info.name,
                img: info.sprites.other.home.front_default,
                types: info.types.map(( element ) => {
                    return {
                        name: element.type.name.replace(element.type.name[0], element.type.name[0].toUpperCase())
                    }
                }),
                hp: info.stats[0].base_stat,
                attack: info.stats[1].base_stat,
                defense: info.stats[2].base_stat,
                velocidad: info.stats[5].base_stat,
                height: info.height,
                weight: info.weight

            }
            return found 
            
        })
        .then(( pokemon ) => {
            res.status( 200 ).send( pokemon )
        })
        .catch(( error ) => {
            console.log( error )
            res.status( 400 ).send( "Invalid ID")
        })
    }
}

const deletePokemon = async ( req, res ) => {

    const { id } = req.params;

    try {
        const deletedPokemon = await pokemon.destroy({
            where: { id }
        });
        res.status( 200 ).send({ 
            data: "Pokemon Deleted", 
            pokemon: deletedPokemon 
        })
        
    } catch ( error ) {
        console.log( error );
    }
    getPokemons();
};

const bulkBreator = async ( req, res ) => {
    try {
        const pokesToBulk = await morePokemons()
        const bulked = await pokemon.bulkCreate( pokesToBulk )
        const uno = pokesToBulk.map(( poke ) => {
            return poke.types.map(( element )=>{
                return element.name
            })
        })
        
            
        const arr = [];
        for ( let i = 0; i < pokesToBulk.length; i++ ) {
            arr.push( types.findAll({
                where: {
                    name: uno[i]
                }
            }))
        }
            
        Promise.all( arr )
        .then(( r )=> {
            const arr = [];
            for( let i = 0; i < r.length; i++ ) {
                arr.push( bulked[i].addTypes( r[i] ) )
            }
            return arr;
        })
        .then(( arr ) => {
            Promise.all( arr )
        })
        .then( async () => {
           const created = await pokemon.findAll({
                include: [{
                    model: types,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            return created;
        })
        .then(( response ) => {
            getPokemons();
            return response;
        })
        .then(( recived ) => {
            res.status( 200 ).send( {data: "Bulked Done ", recived} )
        })
        .catch(( error ) => {
            console.log( error )
        })
        
    } catch ( error ) {
        console.log( error )
    }
    
};

const updatePokemon = async ( req, res ) => {
    const {
        name,
        img,
        hp,
        attack,
        defense,
        velocidad,
        height,
        weight,
        pokeTypes,
        bulked
    } = req.body;

    const { id } = req.params;

    try {
        try {
            const infoApi = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}/`)
            res.status(400).send({data:`The name ${infoApi.data.name} alredy exists, your Pokemon wasn't Updated`})

        } catch {
            const pokeInDb = await pokemon.findOne({
                where: {name: {
                    [Op.iLike]: `${ name.trim() }`
                }}
            });

            if( !pokeInDb || pokeInDb.id === id ) {
                await pokemon.update({
                    name,
                    img,
                    hp,
                    attack,
                    defense,
                    velocidad,
                    height,
                    weight,
                    bulked
                },{
                    where: { id }
                });
                const parcialUpdate = await pokemon.findOne({
                    where: { id }
                })
                const typesDb = await types.findAll({
                    where: {
                        name: {
                            [Op.in]: pokeTypes
                        }
                    }
                });
    
                await parcialUpdate.setTypes( typesDb );
                const updated = await pokemon.findOne({
                    where: { id },
                    include: [{
                        model: types,
                        attributes:[ 'name' ],
                        through: {
                            attributes:[]
                        }
                    }]
                })
                res.status( 200 ).send({data:'Your Pokemon was Updated!', up: updated})
            } else {
                res.status( 400 ).send({data:`The name ${pokeInDb.name} alredy exists, your Pokemon wasn't Updated`})
            }
        }



    } catch ( error ) {
        console.log( error )
    }
    getPokemons();
};

const typeCreator = async ( req, res ) =>{
    const { name } = req.body;
    try {
        const newType = await types.create({ name })
        res.status( 200 ).send( newType )
    } catch ( error ) {
        console.log( error )
        res.status( 400 ).send( { data: "Algo salió mal" } )
    }
    getTypes()
}

const obj = {
    createPokemon,
    getAllPokemonTypes,
    pokeFinder,
    pokeDetail,
    deletePokemon,
    bulkBreator,
    updatePokemon,
    typeCreator
};

module.exports = obj;