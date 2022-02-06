import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../actions";
import Loading from "./Loading";
import NavBar from "./NavBar";

import Pokemon from "./Pokemon";

export default function Home () {
    const dispatch = useDispatch();

    const page = useSelector( state => state.page );
    const loading = useSelector( state => state.loading );
    const pokemons = useSelector(state => state.pokemons);
    const inDetail = useSelector( state => state.inDetail )
    const pokemonsPerPage = useSelector( state => state.pokemonsPerPage );
    const errorSearchByName = useSelector( state => state.errorSearchByName );

    const lastPokemon = page * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const pokemonsOnScreen = pokemons.slice( firstPokemon, lastPokemon );

    

    useEffect(() => {
      !inDetail &&  dispatch( getAllPokemons() );
    }, [ dispatch, inDetail ])

    return (
        <div className="home">
            <div className="navbarConteiner" >
                <div className="NavBar" >
                <NavBar />
                </div>
            </div>
            {
                !loading ? 
                <div className="contenedor">
                {
                    ( pokemons.length && !errorSearchByName.length ) ? 
                    pokemonsOnScreen.map(( poke ) => {
                        return(
                        <div className="conteinerPokecard" key={poke.id}>  
                            <Pokemon 
                            id={poke.id}
                            img={poke.img}
                            name={poke.name}
                            attack={poke.attack}
                            types={poke.types}
                            />   
                        </div>
                        ) 
                    })  : 
                    <div>
                    <Pokemon 
                    /* img={"https://i.pinimg.com/474x/59/8c/5d/598c5da8a0cf4d50a8e55bf93307b251--fanart-pokemon-moment.jpg"} */
                    img={"https://i1.wp.com/www.sopitas.com/wp-content/uploads/2017/07/pikachu.gif"}
                    name={ errorSearchByName } 
                    types={[""]} 
                    />  
                    </div> 
                } 
            </div> : <Loading />
            }
        </div>
    )
}


