import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../actions";

import Pokemon from "./Pokemon";

export default function Home () {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    
    useEffect(() => {
        console.log('hola')
        !pokemons.length && dispatch( getAllPokemons() )
        console.log(pokemons)
       console.log('paso la ejecucion como si nada')
    }, [ dispatch, pokemons] )

    return (
      
            <div className="contenedor">
            {
                pokemons.length ? pokemons.map(( poke ) => {
                    return(
                    <div  key={poke.id}>  
                        <Pokemon 
                        id={poke.id}
                        img={poke.img}
                        name={poke.name}
                        />   
                    </div>
                    ) 
                })  : 
                <div>Loading</div> 
            } 
            </div>
        
    )
}

