import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPokemons, resetUpdating } from "../actions";

export default function AfterEditor () {
    const dispatch = useDispatch();
    const updated = useSelector( state => state.updated );
    const messageUpdate = useSelector( state => state.messageUpdate )
    const handleMainPage = () => {
        dispatch( getAllPokemons() );
        dispatch( resetUpdating() );
    };

    const handleClick = ( event ) => {
        
        dispatch( resetUpdating() );
    };

    const handleBack = () => {
        dispatch( resetUpdating() );
       /*  dispatch( backToCreator() ); */
    };

    return(
        <div className="afterCreator">
            <div className="conteinerAfter">
                <div className="messageAfter">
                {
                    /* updated ? 
                    <h1> {messageUpdate} </h1> : */
                    <h1> {messageUpdate} </h1>
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
                        updated ? 
                    <button
                    className="btnAfter"
                    onClick={ handleClick }
                    >
                        Volver a Editar
                    </button> :
                        <button
                        className="btnAfter"
                        onClick={ handleBack }
                        >
                            Volver a editar
                        </button> 
                    }
                </div>
            </div>
        </div>
    )
}