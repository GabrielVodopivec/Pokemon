import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPokemons } from "../actions";
export default function PokeMessage ({ name, img }) {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch( getAllPokemons() )
    }

    return (
        <div className="PokecardError">
            {name.length && <h2 className="titlePokemonError" > {`${name.replace(name[0], name[0].toUpperCase())}`} </h2>}
            <img 
            className="imgpokeError" 
            src={img} 
            alt="img not found" />
            <div className="imgCardError" >
                <Link to = '/home'>
                    <button 
                    className="btnpokeError"
                    onClick={ handleClick }
                    > Back to Main Page
                    </button>
                </Link>
            </div>
            
        </div>
    )
}