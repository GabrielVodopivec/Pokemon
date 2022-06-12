const { Router } = require('express');

const { 
    createPokemon, 
    getAllPokemonTypes, 
    pokeFinder, 
    pokeDetail, 
    deletePokemon,
    bulkBreator,
    updatePokemon,
    typeCreator
} = require('../middlewares');

const router = Router();

router.route( '/types' )
.get( getAllPokemonTypes );

router.route( '/pokemons' )
.get( pokeFinder )
.post( createPokemon );

router.get( '/detail/:id', pokeDetail );

router.delete('/pokemons/:id', deletePokemon );

router.post( '/pokeomons/bulkCreate', bulkBreator );

router.put( '/pokemons/update/:id', updatePokemon );

router.post( "/pokemons/TypeCreate", typeCreator );

module.exports = router;
