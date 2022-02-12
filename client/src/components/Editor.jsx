import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchById } from "../actions";

import Loading from "./Loading";
import PokeEditor from "./PokeEditor";

const Editor = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const loading = useSelector ( state => state.loading )
    const pokeDetail = useSelector( state => state.pokeDetail );
    
    useEffect(() => {
        !pokeDetail.name && dispatch( searchById( id ))
    },[ dispatch, id, pokeDetail ])
    return(
        <>
        {
            !loading ? 
            <PokeEditor /> :
            <Loading /> 
        }
        </>
    )
}

export default Editor;