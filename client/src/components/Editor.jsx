import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getTypes, searchById } from "../actions";

import Loading from "./Loading";
import PokeEditor from "./PokeEditor";

const Editor = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const pokeDetail = useSelector( state => state.pokeDetail );
    const types = useSelector(state => state.types)
    
    useEffect(() => {
        if ( !types.length ) {
            dispatch( getTypes() ) 
            dispatch( searchById( id ))
        }
    },[ dispatch, id, types ]);

    return(
        <>
        {
            !Object.values(pokeDetail).length ? 
            <Loading /> :
            <PokeEditor />
        }
        </>
    )
};

export default Editor;