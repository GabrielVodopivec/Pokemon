import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { selectPage } from "../actions";

const PaginadoButtons = () => {

    const dispatch = useDispatch();

    const pokemons = useSelector( state => state.pokemons );
    const pokemonsPerPage = useSelector( state => state.pokemonsPerPage );

    const quantityOfButtons = Math.ceil( pokemons.length/pokemonsPerPage)

    const buttons = ( quantityOfButtons ) => {
        let arrButtons = [];
        let page = 1;
        while ( page <= quantityOfButtons ) {
            arrButtons.push( page );
            page++
        };
        return arrButtons;
    }

    const handleClick = ( event ) => {
        event.preventDefault();
        const page = event.target.value;
        dispatch( selectPage( page ));
    }

    return (
        <div className="paginadoArrowsBtnNav">
            {
                buttons( quantityOfButtons ).map(( page ) => {
                    return (
                        <button
                        key={ page }
                        value={ page }
                        className="btnPage"
                        onClick={ handleClick }
                        > { page } </button>
                    )
                })
            }
        </div>
    )
};

export default PaginadoButtons;