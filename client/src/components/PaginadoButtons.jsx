import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { selectPage } from "../actions";

const PaginadoButtons = () => {

    const dispatch = useDispatch(),

    pokemons = useSelector( state => state.pokemons ),
    pokemonsPerPage = useSelector( state => state.pokemonsPerPage ),
    actualPage = useSelector( state => state.page ),

    quantityOfButtons = Math.ceil( pokemons.length/pokemonsPerPage),

    buttons = ( quantityOfButtons ) => {
        let arrButtons = [],
        page = 1;
        while ( page <= quantityOfButtons ) {
            arrButtons.push( page );
            page++
        };
        
        return arrButtons;
    },

    handleClick = ( event ) => {
        event.preventDefault();
        const page = event.target.value;
        dispatch( selectPage( parseInt( page ) ));
    }

    return (
        <div className="paginadoArrowsBtnNav">
            {
                buttons( quantityOfButtons ).map(( page ) => {
                    return (
                        <button
                        key={ page }
                        value={ page }
                        className={( actualPage === page ) ? 
                            "btnPageFocus" : 
                            "btnPage"}
                        onClick={ handleClick }
                        > { page } </button>
                    )
                })
            }
        </div>
    )
};

export default PaginadoButtons;