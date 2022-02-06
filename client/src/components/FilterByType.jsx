import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByType, getTypes } from "../actions";

export default function FiterByType () {

    const dispatch = useDispatch();
    const types = useSelector( state => state.types );

    useEffect(() => {
        !types.length && dispatch( getTypes() )
    }, [ dispatch, types ])

    const handleSelect = ( event ) => {
        const type = event.target.value;
        console.log(type)
        dispatch( filterByType( type ) )
        window.document.getElementsByClassName("selectType")[0].value = "Types";
    }


    return (
        <div className="conteinerSelectTypeNav">
            
            <select className="selectType" defaultValue="Types" onChange = { handleSelect } >
                <option value="Types" hidden >Types</option>
                <option value="All">All types</option>
                {
                    types.map(( type ) => {
                        return (
                            <option
                            key={ type.id } 
                            value = { type.name } 
                            > { type.name } </option>
                        )
                    })
                }
            </select>
        </div>
    )
}