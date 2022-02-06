import React from "react";
import { useDispatch } from "react-redux"

import { orderByAttack } from "../actions";

export default function OrderByAttack () {

    const dispatch = useDispatch()
    

    const handleAttackOrder = ( event ) => {
        event.preventDefault();
        const orderType = event.target.value;
        console.log(orderType)
        dispatch( orderByAttack( orderType ) )
        window.document.getElementsByClassName("selectOrderNav")[0].value = "Attack Order";
    }

    return (
        <div className="conteinerInputOrderNav">
            <select className="selectOrderNav" defaultValue={"Attack Order"} onChange={ handleAttackOrder }>
                <option value="Attack Order" hidden> Attack Order </option>
                <option value="ASC"> Lowest first </option>
                <option value="DSC"> Highest first </option>
            </select>
        </div>
    )
}

