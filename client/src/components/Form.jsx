import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTypes } from "../actions";
import Loading from "./Loading";
import PokeCreator from "./PokeCreator";

export default function Form () {
    const dispatch = useDispatch();
    const types = useSelector( state => state.types )
    const loading = useSelector( state => state.loading )
    
    useEffect(() => {
        if ( !types.length ) {
            dispatch( getTypes() )
        }
    }, [ dispatch, types ])
    return (
        <div >
        {
            loading ? <Loading /> : <PokeCreator /> 
        }
        </div>
    )
}