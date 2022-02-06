import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { orderAlphabetically } from "../actions";

export default function OrderAlphabetically () {
    const dispatch = useDispatch();
    const pokemons = useSelector( state => state.pokemons );

    const handleOrder = ( event ) => {
        event.preventDefault();
        const orderType = event.target.value;
        pokemons.length && dispatch( orderAlphabetically( orderType ))
        window.document.getElementsByClassName("selectOrderAlphNav")[0].value = "Alphabetic Order";
    }
    return (
        <div className="conteinerInputOrderNav">
            <select className="selectOrderAlphNav" defaultValue={"Alphabetic Order"} onChange={ handleOrder }>
                <option value={"Alphabetic Order"} hidden>Alphabetic Order</option>
                <option value="ASC">A-Z</option>
                <option value="DSC">Z-A</option>
            </select>
        </div>
    )
}