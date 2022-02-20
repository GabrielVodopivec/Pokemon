import React from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../actions";

const FilterByOrigin = () => {
    const dispatch = useDispatch();
    const handleChange = ( event ) =>{
        event.preventDefault();
        dispatch( filterByOrigin( event.target.value ) );
        window.document.getElementsByClassName("selectOrigin")[0].value = "Origin";
    }
    return (
        <div className="conteinerFilterByOriginNav">
            <select className="selectOrigin" defaultValue={"Origin"} onChange={ handleChange }>
                <option value="Origin" hidden> Origin </option>
                <option value="api"> Api </option>
                <option value="db"> Data Base </option>
            </select>
        </div>
    )
}

export default FilterByOrigin;