import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Loading from "./Loading";
import Pokemon from "./Pokemon";

import { searchById } from "../actions";

const PokeDetail = () =>{

    const { id } = useParams();
    const dispatch = useDispatch();

    const pokeDetail = useSelector( state => state.pokeDetail);
    const loading = useSelector( state => state.loading );
    const errorSearchById = useSelector( state => state.errorSearchById );
    
    useEffect(() => {
        dispatch( searchById( id ) )
    },[ dispatch, id])

    return (
        <>
        {   !errorSearchById.length ?
            ( pokeDetail.name && !loading ) ?
            <div className="conteinerDetail">
                <div className="subConteiner1">
                    <div className="conteinerInternoDetail">
                    { 
                        <div className="conteinerNameDetail">
                            {
                                pokeDetail.name.length && 
                                <h1 className="nameDetail"> 
                                    {
                                    `${pokeDetail.name.replace(pokeDetail.name[0], pokeDetail.name[0].toUpperCase())}`
                                    } 
                                </h1>
                            }
                            <div>
                            <h2>Physical Stats</h2>
                                <h3> {`Height: ${pokeDetail.height}`} </h3>
                                <h3> {`weight: ${pokeDetail.weight}`} </h3>
                            </div>
                            <h4> {`ID: ${pokeDetail.id}`} </h4>
                            <Link to = '/home'>
                                <button className="BtnCreatePokemonsNav">Go Back!</button>
                            </Link>
                        </div> 
                    }
                    </div>
                </div>
                <div className="subConteiner3">
                    <div>
                        <img className="imgDetail" src={ pokeDetail.img } alt="Img not found" />
                    </div>
                </div>
                <div className="subConteiner2">
                    
                    <div className="conteinerBattleStatsDetail">
                        <div>
                            <h2>Battle Stats</h2>
                        </div>
                        <div>
                            <h3> {`⚔️ ${pokeDetail.attack}`} </h3>
                            <h3> {`🛡️ ${pokeDetail.defense}`} </h3>
                            <h3> {`🧡 ${pokeDetail.hp}`} </h3>
                            <h3> {`🏃 ${pokeDetail.velocidad}`} </h3>
                        </div>
                    </div>
                    <div className="conteinerTypesDetail">
                        <div>
                            <h2>Types</h2>
                        </div>
                        <div className="TypesDetail">
                            {
                                pokeDetail.types.map(( type, index ) => {
                                    return (
                                        <h3 key={ index }> {type.name} </h3>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div> :
            <Loading /> :
            <div>
                    <Pokemon 
                    img={"https://i.pinimg.com/474x/59/8c/5d/598c5da8a0cf4d50a8e55bf93307b251--fanart-pokemon-moment.jpg"}
                    name={ errorSearchById } 
                    types={[""]} 
                    />  
            </div>
        }   
        </>
    )
};

export default PokeDetail;