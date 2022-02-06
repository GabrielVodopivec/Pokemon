import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { searchByName } from "../actions";

export default function SearchByName () {
    const dispatch = useDispatch();
    const [ name, setName ] = useState( "" )

    const handleSubmit = ( event ) => {
        event.preventDefault();
        name.length && dispatch( searchByName( name.toLowerCase() ) ); 
        setName( '' );   
    }
    
    const handleChange = ( event ) => {
        event.preventDefault();
        setName( event.target.value )
    }
    return (
        <form 
        onSubmit={ handleSubmit }
        >
            <input 
            className="inputSearchByNameNav"
            type="text"
            value={ name }
            placeholder="Search by name"
            onChange={ handleChange }  
            />
            <input 
            className="buttonSearchByNameNav"
            type="submit"
            />
        </form>
    )
}