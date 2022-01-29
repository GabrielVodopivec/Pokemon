const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getPokemons = require("./getAllPokemons")
const allPokemons = getPokemons();
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', ( req, res ) => {

    allPokemons
    .then(( response ) => {
        res.status( 200 ).send( response )
    })
    .catch((error) => {
        console.log('Something went wrong')
        res.status(400).send('algo salio mal')
    })
})

module.exports = router;
