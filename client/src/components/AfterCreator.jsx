import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { backToCreator, getAllPokemons, resetCreator } from "../actions";
const AfterCreator = () => {
    const dispatch = useDispatch();
    const created = useSelector( state => state.created );

    const handleMainPage = () => {
        dispatch( getAllPokemons() )
    }
    const handleClick = ( event ) => {
        event.preventDefault();
        
        dispatch( resetCreator() )
    }
    const handleBack = () => {
        dispatch( backToCreator() )
    }
    return(
        <div className="afterCreator">
            <div className="conteinerAfter">

                <div className="messageAfter">
                {
                    created ? 
                    <h1>Su Pokemon fue creado con éxito!</h1> :
                    <h1>Ese nombre Ya existe, el Pokemon no fue creado</h1>
                }
                </div>
                
                <div className="conteinerBtnsAfter">
                    <Link className="LinkbtnAfter" to = "/home">
                        <button
                        onClick={ handleMainPage }
                        className="btnAfter"> Main Page</button>
                    </Link>
                    
                    <button
                    className="btnAfter"
                    onClick={ handleClick }
                    >Crear otro Pokemon</button>

                    {!created ? 
                    <button
                    className="btnAfter"
                    onClick={ handleBack }
                    >Volover a editar</button> :
                    null
                    }
                </div>
            
            </div>
        </div>
    )
}

export default AfterCreator;