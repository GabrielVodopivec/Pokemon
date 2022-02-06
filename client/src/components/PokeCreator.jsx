import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPokemon, editingAgain } from "../actions";
import AfterCreator from "./AfterCreator";

import PokePre from "./PokePre";
import Loading from "./Loading"
import { useEffect } from "react";

export default function PokeCreator () {

    const dispatch = useDispatch();
    const types = useSelector( state => state.types)
    const creating = useSelector( state => state.creating )
    const loading = useSelector( state => state.loading )
    const back = useSelector( state => state.back )
    const pokeCache = useSelector( state => state.pokeCache )
    const [ pokemon, setPokemon ] = useState({
        name: "",
        img: "",
        hp: 0,
        attack: 0,
        defense: 0,
        velocidad: 0,
        height: 0,
        weight: 0,
        pokeTypes: []
    })

    const [ errorType, setErrorType ] = useState({
        name: "",
        attack: "",
        defense: "",
        hp: "",
        velocidad: "",
        height: "",
        weight: ""
    })

    useEffect(() => {
        back && setPokemon({
            name: pokeCache.name,
            img: pokeCache.img,
            hp: pokeCache.hp,
            attack: pokeCache.attack,
            defense: pokeCache.defense,
            velocidad: pokeCache.velocidad,
            height: pokeCache.height,
            weight: pokeCache.weight,
            pokeTypes: pokeCache.pokeTypes
        })
        dispatch( editingAgain())
    }, [dispatch, back, pokeCache])

    const inputValidator = ( event ) =>{
        
        switch ( event.target.name ) {
            case "pokeName":
                event.preventDefault();
                const reg = /[^a-zA-Z\s.]/;
                // Busco cualquier cosa que no sean letras, espacios o puntos ( Caracteres permitidos )
                reg.test( event.target.value ) ?
                setErrorType({
                    ...errorType,
                    name: "Special Characters are not allowed."
                }) :
                setErrorType({
                    ...errorType,
                    name: ""
                }) 
                setPokemon({
                    ...pokemon,
                    name: event.target.value
                }) 
                break;
            case "pokeImg":
                event.preventDefault();
                setPokemon({
                    ...pokemon,
                    img: event.target.value
                })
                break;
            case "type":
                setPokemon(() => {
                    if ( event.target.checked ) {
                        return {
                            ...pokemon,
                            pokeTypes: [ ...pokemon.pokeTypes, event.target.value ]
                        }
                    } else {
                        let filteredTypes = [];
                        let i = 0;
                        while ( i < pokemon.pokeTypes.length ) {
                            if ( pokemon.pokeTypes[i] !== event.target.value ) {
                                filteredTypes = [
                                    ...filteredTypes,
                                    pokemon.pokeTypes[i]
                                ]
                            }
                            i++
                        }
                        return {
                            ...pokemon,
                            pokeTypes: filteredTypes
                        }
                    }
                })
                break;
            case "attack":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    attack: " Max Attack value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    attack: ""
                })
                setPokemon({
                    ...pokemon,
                    attack: event.target.value
                })
                break;
            case "defense":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    defense: " Max Defense value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    defense: ""
                })
                setPokemon({
                    ...pokemon,
                    defense: event.target.value
                })
                break;
            case "hp":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    hp: " Max Hp value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    hp: ""
                })
                setPokemon({
                    ...pokemon,
                    hp: event.target.value
                })
                break;
            case "velocidad":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    velocidad: " Max Speed value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    velocidad: ""
                })
                setPokemon({
                    ...pokemon,
                    velocidad: event.target.value
                })
                break;
            case "height":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    height: " Max Height value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    height: ""
                })
                setPokemon({
                    ...pokemon,
                    height: event.target.value
                })
                break;
            case "weight":
                ( (event.target.value) > 200 ) ?
                setErrorType({
                    ...errorType,
                    weight: " Max Weight value is 200"
                }) :
                setErrorType({
                    ...errorType,
                    weight: ""
                })
                setPokemon({
                    ...pokemon,
                    weight: event.target.value
                })
                break;
            default: break;
        }
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()
        dispatch( createPokemon( pokemon ) )
        setPokemon({
            name: "",
            img: "",
            hp: 0,
            attack: 0,
            defense: 0,
            velocidad: 0,
            height: 0,
            weight: 0,
            pokeTypes: []
        })
    }
    return (
        <>
        {

        !loading ?
        <>
        {
            creating ?
            <form 
            className="form"
            onSubmit={ handleSubmit }
            >
            <div className="pokeCreator">
                <div className="firstColumn">
                    <h2>Main Information</h2>
                    <div className="conteinerNameCreator">
                        <label htmlFor="">
                            Name
                        </label>
                        <input 
                        type="text"
                        name="pokeName"
                        placeholder="Nombre del pokemon"
                        value={ pokemon.name }
                        onChange={ inputValidator }
                        />
                    </div>
                    <div className="conteinerUrlImageCretor">
                        <label htmlFor="">
                            {`Image (url)`}
                        </label>
                        <input 
                        type="url" 
                        name="pokeImg"
                        id="url"
                        placeholder="https://example.com"
                        value={ pokemon.img }
                        pattern="https://.*" size="30"
                        required 
                        onChange={ inputValidator }
                        />
                        {/* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/600.png */}
                    </div>
                    <div className="conteinerPhyStatsCreator">
                        <h2 className="titilePhyCreator">Physical stats</h2>
                        <div className="conteinerBattleStatsCreator">
                            <div className="battleStatCreator">
                                <label className="labelPhyCreator" htmlFor="">Height</label>
                                <input 
                                className="inputPhyCreator"
                                type="number"
                                name="height"
                                min="0" 
                                defaultValue={pokeCache.height}
                                /* value={ pokemon.height } */
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelPhyCreator" htmlFor="">Weight</label>
                                <input 
                                className="inputPhyCreator"
                                type="number"
                                name="weight"
                                min="0" 
                                defaultValue={pokeCache.weight}
                                /* value={ pokemon.weight } */
                                onChange = { inputValidator }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="conteinerBattleStats-titleCreator">
                        <h2 className="titleBattleStatsCreator">Battle Stats</h2>
                        <div className="conteinerBattleStatsCreator">
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Attack</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="attack"
                                defaultValue={pokeCache.attack}
                                min="0" 
                                /* value={ pokemon.attack } */
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Defense</label>
                                <input
                                className="inputBattleStatsCreator" 
                                type="number"
                                name="defense"
                                defaultValue={pokeCache.defense}
                                min="0" 
                                /* value={ pokemon.defense } */
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Hp</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="hp"
                                defaultValue={pokeCache.hp}
                                min="0" 
                                /* value={ pokemon.hp } */
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Speed</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="velocidad"
                                defaultValue={pokeCache.velocidad}
                                min="0" 
                                /* value={ pokemon.velocidad } */
                                onChange = { inputValidator }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="conteinerProblemsCreator">
                        <h2 className="titleProblemsCreator">Problems</h2>
                        <ul className="problemsCreator">
                            {
                                Object.values( errorType ).map(( errorMessage, index ) => {
                                    return (
                                        <li key={ index }> {errorMessage }</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="conteinerBtnsCreator">
                        <div className="conteinerBtnMainCreator">
                            <Link to = '/home'>
                                <button className="btnMainCreator">Main Page</button>
                            </Link>
                        </div>
                        
                        <div className="conteinerSubmitCreator">
                        {   
                            !errorType.name &&
                            !errorType.attack &&
                            pokemon.name ?
                            <input className="submitCreator" type="submit" value="Crear"/> : null
                        }
                        </div>
                    </div>
                </div>
                <div className="secondColumn">
                        <h2>Types</h2>
                    <div className="typesConteiner">
                        {
                            types.map(( el, index ) => {
                                return(
                                    <div
                                    key={ index } 
                                    className="divCheckboxType"
                                    >
                                        <input
                                        className="selectType-creator" 
                                        type="checkbox"
                                        id={ el.name }
                                        name="type"
                                        defaultChecked = {
                                           pokeCache.pokeTypes ?
                                           pokeCache.pokeTypes.some( ele => ele === el.name ) :
                                           null
                                        }
                                        value={ el.name }
                                        onChange={ inputValidator } 
                                        />
                                        <label 
                                        htmlFor={ el.name }
                                        className="labelTypes"
                                        >
                                        { el.name }    
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="thirdColumn" >
                    <h2>PREVISUALIZACION</h2>
                    <PokePre 
                    /* name = { pokemon.name }
                    img = { pokemon.img } 
                    weight = { pokemon.weight }
                    height = { pokemon.height } */
                    poke = { pokemon }
                    />
                </div>
            </div>
            </form> :
            <AfterCreator />
        }
        </> :
        <Loading />
        }
        </>
    )
}