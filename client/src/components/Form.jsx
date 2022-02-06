import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTypes } from "../actions";
import PokeCreator from "./PokeCreator";

export default function Form () {
    const dispatch = useDispatch();
    const types = useSelector( state => state.types )
    
    useEffect(() => {
        if ( !types.length ) {
            dispatch( getTypes() )
        }
    }, [ dispatch, types ])
    return (
        <div >
        {
            types.length && <PokeCreator />
        }
        </div>
    )
}