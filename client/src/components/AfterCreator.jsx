import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { backToCreator, getAllPokemons, resetCreator } from "../actions";

const AfterCreator = ( props ) => {
    
    
    const dispatch = useDispatch();
    const created = useSelector( state => state.created );
    const errorCreated = useSelector( state => state.errorCreated );
    const pokeCache = useSelector( state => state.pokeCache )

    const handleMainPage = () => {
        dispatch( getAllPokemons() );
    };

    const handleClick = () => {
        dispatch( resetCreator() );
    };

    const handleBack = () => {
        dispatch( backToCreator() );
    };

    return(
        <div className="afterCreator">
            <div className="conteinerAfter">
                <div className="messageAfter">
                {
                    created ? 
                    <h1>Your Pokemon was created successfully!</h1> :
                    <h1 className="messageAfterCreator">
                        {
                            errorCreated.length ? 
                            errorCreated : 
                            `The name ${pokeCache.name.replace(pokeCache.name[0], pokeCache.name[0].toUpperCase() )} alredy exists, Your pokemon was not created...`
                        }
                    </h1>
                }
                </div>
                <div className="conteinerBtnsAfter">
                    <Link className="LinkbtnAfter" to = "/home">
                        <button
                        onClick={ handleMainPage }
                        className="btnAfter"
                        >
                            Main Page
                        </button>
                    </Link>
                    {
                        created ? 
                        <>
                        <Link className="LinkbtnAfter" to= {`/detail/${props.id}`}>
                            <button
                            className="btnAfter"
                            onClick={ handleClick }
                            >
                                See my Pokemon
                            </button> 
                        </Link>
                        
                        <button
                        className="btnAfter"
                        onClick={ handleClick }
                        >
                            Create Another Pokemon
                        </button> 
                        </> :
                        <button
                        className="btnAfter"
                        onClick={ handleBack }
                        >
                            Back to edit
                        </button> 
                    }
                </div>
            </div>
        </div>
    )
};

export default AfterCreator;