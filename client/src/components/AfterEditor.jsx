import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllPokemons, resetUpdating } from "../actions";

export default function AfterEditor ( props ) {
    const dispatch = useDispatch();

    const updated = useSelector( state => state.updated );
    const messageUpdate = useSelector( state => state.messageUpdate )
    
    const handleMainPage = () => {
        dispatch( getAllPokemons() );
        dispatch( resetUpdating() );
    };

    const handleClick = () => {
        dispatch(getAllPokemons())
        dispatch( resetUpdating() );
    };

    const handleBack = () => {
        dispatch( resetUpdating() );
    };

    return(
        <div className="afterCreator">
            <div className="conteinerAfter">
                <div className="messageAfter">
                    <h1> {messageUpdate} </h1>
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
                        updated ? 
                        <>
                            <Link className="LinkbtnAfter" to = {`/detail/${ props.id }`} >
                                <button
                                className="btnAfter"
                                onClick={ handleClick }
                                >
                                    See My Pokemon
                                </button> 
                            </Link>
                            <button
                            className="btnAfter"
                            onClick={ handleClick }
                            >
                                Back to Edit
                            </button> 
                        </> :
                        <button
                        className="btnAfter"
                        onClick={ handleBack }
                        >
                            Back to Edit
                        </button> 
                    }
                </div>
            </div>
        </div>
    )
}