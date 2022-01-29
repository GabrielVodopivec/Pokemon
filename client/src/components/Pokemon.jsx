import React from "react";
import { Link } from "react-router-dom";



export default function Pokemon ( { id, name, img/* , types, hp, attack, defense, height, weight */ } ) {


    return (
        <div className="Pokecard">
            <h2 > {name} </h2>
            <div className="imgCard" >

            <Link  to = {`/detail/${id}`}>
            <img className="imgpoke" src={img} alt="img not found" />
            </Link>
            </div>
        </div>
    )
}