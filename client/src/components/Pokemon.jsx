import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setDetail, getAllPokemons } from "../actions";

export default function Pokemon ( { id, name, img, types, attack } ) {

    const dispatch = useDispatch();
    
    const errorSearchByName = useSelector( state => state.errorSearchByName );
    const errorSearchById = useSelector( state => state.errorSearchById );
    const activeFilter = useSelector( state => state.activeFilter )

    const handleDetail = () => {
        dispatch( setDetail() )
    }
    
    const handleClick = () => {
        dispatch( getAllPokemons() )
    }

    return (
        <div className="Pokecard">
            
            <div className="imgCard" >
            {
                !errorSearchByName.length && !errorSearchById.length ?
                <Link onClick={ handleDetail } to = {`/detail/${id}`}>
                    <img className="imgpoke" src={img} alt="img not found" />
                </Link> :
                <Link to = '/home'>
                <button 
                className="imgpokeError"
                onClick={ handleClick }
                >   
                    <img className="imgpoke" src={img} alt="img not found" />
                </button>
                </Link>
            }
            </div>
            {name.length && <h2 className="titlePokemon" > {`${name.replace(name[0], name[0].toUpperCase())}`} </h2>}
            {/* <h3> {attack?`Attack: ${ attack }`: null} </h3> */}
            <div className="pokeTypes" >
                {
                    types.length ? types.map(( type, index ) => {
                        return (
                            <div
                            className = {
                                ( activeFilter === type.name ) ?
                                "typesNamePokemonfiltered" :
                                "typesNamePokemon"
                            }
                            key={ index }
                            > { type.name.replace(type.name[0], type.name[0].toUpperCase()) } </div>
                        )
                    }): null
                }
            </div>
        </div>
    )
}