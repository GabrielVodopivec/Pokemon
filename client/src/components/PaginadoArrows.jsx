import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPage } from "../actions";

export default function PaginadoArrows () {

    const dispatch = useDispatch();

    const pokemons = useSelector( state => state.pokemons );
    const pokemonsPerPage = useSelector( state => state.pokemonsPerPage );
    const page = useSelector( state => state.page );

    const quantityOfButtons = Math.ceil( pokemons.length/pokemonsPerPage);

    const handlePrev = () => {
        let prev = page - 1;
        ( page !== 1 ) &&  dispatch( selectPage( prev ) );
    };

    const handleNext = () => {
        let next = page + 1;
        ( page !== quantityOfButtons ) && dispatch( selectPage( next ));
    }
    return (
        <div className="paginadoArrows" >
            <div className="paginadoArrowsBtnNav">
                {
                    ( page !== 1 ) ?
                    <div>
                        <button
                        className="btnPageArrow"
                        onClick={ handlePrev }
                        > ◀ </button>
                    </div> : null
                }
            </div>
            <div className="paginadoArrowsBtnNav">
                <div> {`${page} / ${quantityOfButtons}`} </div>
            </div>
            <div className="paginadoArrowsBtnNav">
                {
                    ( page !== quantityOfButtons ) ?
                    <div>
                        <button
                        className="btnPageArrow"
                        onClick={ handleNext }
                        >▶</button>
                    </div> : null
                }
            </div>
        </div>
    )
}