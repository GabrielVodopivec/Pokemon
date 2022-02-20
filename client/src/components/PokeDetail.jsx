import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Loading from "./Loading";

import { deletePokemon, searchById } from "../actions";
import { useState } from "react";
import PokeMessage from "./PokeMessage";



const PokeDetail = () =>{

    const { id } = useParams();
    const dispatch = useDispatch();

    const pokeDetail = useSelector( state => state.pokeDetail);
    const loading = useSelector( state => state.loading );
    const errorSearchById = useSelector( state => state.errorSearchById );
    const deleted = useSelector( state => state.deleted );

    const barStyleAttack = {
        padding: "2px",
        height: "10px",
        width:"130px",
        border: " 1px solid #1059A8",
        background: `linear-gradient(45deg, #1059A8 ${Math.round(pokeDetail.attack/200*100)}%, transparent ${(Math.round(pokeDetail.attack/200*100))}% 100% )`
    }
    const barStyleDef = {
        padding: "2px",
        height: "10px",
        width:"130px",
        border: "1px solid #1059A8 ",
        background: `linear-gradient(45deg, #1059A8 ${((pokeDetail.defense/200)*100)}%, transparent ${((pokeDetail.defense/200)*100)}% 100%)`
    }
    const barStyleHp = {
        padding: "2px",
        height: "10px",
        width:"130px",
        border: "1px solid #1059A8 ",
        background: `linear-gradient(45deg, #1059A8 ${((pokeDetail.hp/200)*100)}%, transparent ${((pokeDetail.hp/200)*100)}% 100%)`
    }
    const barStyleSpeed = {
        padding: "2px",
        height: "10px",
        width:"130px",
        border: "1px solid #1059A8 ",
        background: `linear-gradient(45deg, #1059A8 ${((pokeDetail.velocidad/200)*100)}%, transparent ${((pokeDetail.velocidad/200)*100)}% 100%)`
    }
    
    useEffect(() => {
        dispatch( searchById( id ) )
    },[ dispatch, id])
    
    const [ alert, setAlert ] = useState( true );

    const handleAlert = () => {
        alert ?
        setAlert( false ) :
        setAlert( true )
    }

    const handleDelete = () => {
        setAlert( true );
        dispatch( deletePokemon( id ) )
    }

    const handleEdit = () => {
        
    }

    return (
        <>
        {
            !deleted ?
        <>
        
        {   !errorSearchById.length ?
            ( pokeDetail.name && !loading ) ?
            <div className="conteinerDetail">
                <div className="subConteiner1">
                    <div className="conteinerInternoDetail">
                    { 
                        <div className="conteinerNameDetail">
                            <div>
                            {
                                pokeDetail.name.length && 
                                <h1 className="nameDetail"> 
                                    {
                                    `${pokeDetail.name.replace(pokeDetail.name[0], pokeDetail.name[0].toUpperCase())}`
                                    } 
                                </h1>
                            }
                            <h4> {`ID: ${pokeDetail.id}`} </h4>
                            </div>
                            
                            <div className="conteinerPhyTypesDetail">
                                    
                                <div className="contPhyDetail">
                                    <h1>Physical Stats</h1>
                                    <div className="ordenadorPhy">
                                        <div className="dataphy">
                                        <h2> {`Height`} </h2>
                                        <h2>{`${pokeDetail.height}`}</h2>
                                        </div>
                                        <div className="dataphy">
                                        <h2> {`Weight`} </h2>
                                        <h2>{`${pokeDetail.weight}`}</h2>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="conteinerTypesDetail">
                                    <div>
                                        <h1>Types</h1>
                                    </div>
                                    <div className="TypesDetail">
                                        {
                                            pokeDetail.types.map(( type, index ) => {
                                                return (
                                                    <h2 
                                                    className="h3Types"
                                                    key={ index }
                                                    > {type.name.replace(type.name[0], type.name[0].toUpperCase())} </h2>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                                </div>
                                <div >
                                    <Link to = '/home'>
                                        <button className="BtnCreatePokemonsNav">Go Back!</button>
                                    </Link>
                                </div>
                            
                        </div> 
                    }
                    </div>
                </div>
                <div className="subConteiner3">
                    
                        <img className="imgDetail" src={ pokeDetail.img } alt="Img not found" />
                        <div className="conteinerbtnsDetail">
                                <div className="conteinerbtnsdeletedetail">
                                    {
                                        pokeDetail.fromdb ?
                                        <>
                                            <div className="conteinerBtnEditDetail">
                                                <Link to = {`/editor/${id}`} >
                                                    <button
                                                    onClick={ handleEdit }
                                                    className="EditBtnDetail"
                                                    >Edit</button>
                                                </Link>
                                            </div>
                                            <div className="conteinerBtnsDeleteDetail">
                                                <div className="btnsDeleteDetail">
                                                    { 
                                                        alert ?
                                                        <button
                                                        className="deletebtnDetail"
                                                        onClick={ handleAlert }
                                                        >Delete
                                                        </button> :
                                                        <div>
                                                            <h3>Are you sure? this action is permanent...</h3>
                                                            <button
                                                            className="btnAreYouSureDetailYes"
                                                            onClick={ handleDelete }
                                                            >YES
                                                            </button>
                                                            <button
                                                            className="btnAreYouSureDetailNo"                                                    
                                                            onClick={ handleAlert }
                                                            >NO
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </> : null
                                    }
                                </div>
                            </div>
                </div>
                <div className="subConteiner2">
                    
                    <div className="conteinerBattleStatsDetail">
                        <div>
                            <h1>Battle Stats</h1>
                        </div>
                        <div className="contStatDetail">
                            <div className="statDetail">
                                <h1 className="statImageDetail">⚔️</h1>
                                <div className="barStyle" style={barStyleAttack}></div>
                                <h2 className="statValueDetail"> {`${pokeDetail.attack}`} </h2>
                            </div>
                            <div className="statDetail">
                                <h1 className="statImageDetail">🛡️</h1>
                                <div className="barStyle" style={barStyleDef}></div>
                                <h2 className="statValueDetail"> {`${pokeDetail.defense}`} </h2>
                            </div>
                            <div className="statDetail">
                                <h1 className="statImageDetail">🧡</h1>
                                <div className="barStyle" style={barStyleHp}></div>
                                <h2 className="statValueDetail"> {`${pokeDetail.hp}`} </h2>
                            </div>
                            <div className="statDetail">
                                <h1 className="statImageDetail">🏃</h1>
                                <div className="barStyle" style={barStyleSpeed}></div>
                                <h2 className="statValueDetail"> {`${pokeDetail.velocidad}`} </h2>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> :
            <Loading /> :
            <PokeMessage
            name={errorSearchById}
            img={"https://c.tenor.com/Kx9EVA2bKJ4AAAAC/pokemon-pikachu.gif"}
            />
        }
        </> : 
        <PokeMessage 
        name = { "Your pokemon was deleted"}
        img={"https://c.tenor.com/Kx9EVA2bKJ4AAAAC/pokemon-pikachu.gif"}
        />
        }  
        </>
    )
};

export default PokeDetail;