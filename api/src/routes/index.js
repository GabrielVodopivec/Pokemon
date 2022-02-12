const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { pokemon, types } = require('../db');
const { getPokemons, getTypes, morePokemons } = require("./getInfo")
let allPokemons = getPokemons();
const pokeTpyes = getTypes()
const pokemonsToBulk = morePokemons();
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/types', ( req, res ) => {
    pokeTpyes
    .then(( resp ) => {
        res.status( 200 ).send( resp )
    })
    .catch(() =>{
        res.status( 400 ).send('hubo problemas')
    })
})

router.get('/pokemons', ( req, res ) => {
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
            .catch(( error ) => {
                console.log( error )
                res.status( 400 ).send( "Hubo problemas en el proceso de busqueda")
            })

    } else {
        
        allPokemons
        .then(( response ) => {
            res.status( 200 ).send( response )
        })
        .catch(( error ) => {
            console.log( error )
            res.status(400).send( 'Something went wrong' )
        })
    }
})

router.get('/detail/:id', ( req, res ) => {

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
                    name: element.type.name
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
})

router.post('/pokemons', async ( req, res ) => {
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

        res.status( 200 ).send( {wasCreated: created, pokemonCreated } )
    } catch ( error ) {
        console.log(error)
    }
    
    allPokemons = getPokemons();
})

router.delete('/pokemons/:id', async ( req, res ) => {

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
    allPokemons = getPokemons();
})

router.post('/pokeomons/bulkCreate', async ( req, res ) => {
    try {
        const pokesToBulk = await pokemonsToBulk
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
            allPokemons = getPokemons();
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
    /* allPokemons = getPokemons(); */
})

router.put('/pokemons/update/:id', async ( req, res ) => {
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
            res.status(400).send({data:`EL nombre ${infoApi.data.name} ya existe, Pokemon no actualizado`})

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
                res.status( 200 ).send({data:'Pokemon Updated', up: updated})
            } else {
                res.status( 400 ).send({data:`El nombre ${pokeInDb.name} ya existe, Pokemon no actualizado`})
            }
        }



    } catch ( error ) {
        console.log( error )
    }
    allPokemons = getPokemons();
})

module.exports = router;
