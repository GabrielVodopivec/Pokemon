import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AfterCreator from "./AfterCreator";
import PokePre from "./PokePre";
import Loading from "./Loading"

import { createPokemon, editingAgain, getAllPokemons } from "../actions";

export default function PokeCreator () {

    const dispatch = useDispatch();
    const types = useSelector( state => state.types);
    const creating = useSelector( state => state.creating );
    const loading = useSelector( state => state.loading );
    const back = useSelector( state => state.back );
    const pokeCache = useSelector( state => state.pokeCache );
    const created = useSelector( state => state.created );
    const createdPokemon = useSelector( state => state.createdPokemon)

    const [ pokemon, setPokemon ] = useState({
        name: "",
        img: "",
        hp: "",
        attack: "",
        defense: "",
        velocidad: "",
        height: "",
        weight: "",
        pokeTypes: [],
        bulked:false
    })

    const [ errorType, setErrorType ] = useState({
        name: "Pokemon`s name is required",
        height: "Height must be a number between 0 - 1000",
        weight: "Weight must be a number between 0 - 1000",
        attack: "Attack must be a number between 0 - 200",
        defense: "Defense must be a number between 0 - 200",
        hp: "Hp must be a number between 0 - 200",
        velocidad: "Speed must be a number between 0 - 200",
    })

    const resetCheckbox = () => {
        let i = 0;
        let arr = []
        while ( i < window.document.getElementsByClassName("selectType-creator").length) {
            arr.push(window.document.getElementsByClassName("selectType-creator")[i].checked = false)
            i++
        }
        return arr
    }

    useEffect(() => {
        
        if (created) resetCheckbox();

        if( back ) {
            setPokemon({
                name: pokeCache.name,
                img: pokeCache.img,
                hp: pokeCache.hp,
                attack: pokeCache.attack,
                defense: pokeCache.defense,
                velocidad: pokeCache.velocidad,
                height: pokeCache.height,
                weight: pokeCache.weight,
                pokeTypes: pokeCache.pokeTypes,
                bulked:false
            })
            setErrorType({
                name: "",
                attack: "",
                defense: "",
                hp: "",
                velocidad: "",
                height: "",
                weight: ""
            })
        }
        
        dispatch( editingAgain())
    }, [dispatch, created, back, pokeCache])

    const inputValidator = ( event ) =>{
        const regExpNum = /^-[0-9]/;
        const regExpName = /[^a-zA-Z\s\-().]/;
        // Busco cualquier cosa que no sean letras, espacios, puntos o - ( Caracteres permitidos )
        switch ( event.target.name ) {

            case "pokeName":
                event.preventDefault();
                !event.target.value.length ?
                setErrorType({
                    ...errorType,
                    name: "The pokemon must have a name"
                }) :
                regExpName.test( event.target.value ) ?
                setErrorType({
                    ...errorType,
                    name: "The name can not contain Special Characters."
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
                
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 200 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    attack: "Attack must be a number between 0 - 200"
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
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 200 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    defense: "Defense must be a number between 0 - 200"
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
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 200 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    hp: "Hp must be a number between 0 - 200"
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
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 200 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    velocidad: " Speed must be a number between 0 - 200"
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
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 1000 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    height: "Height must be a number between 0 - 1000"
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
                (
                    regExpNum.test( event.target.value ) ||
                    event.target.value.length === 0 || 
                    (event.target.value) > 1000 || 
                    ((event.target.value) < 0) 
                ) ?
                setErrorType({
                    ...errorType,
                    weight: "Weight must be a number between 0 - 1000"
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
        event.preventDefault();
        
        dispatch( createPokemon( pokemon ) )
        setPokemon({
            name: "",
            img: "",
            hp: "",
            attack: "",
            defense: "",
            velocidad: "",
            height: "",
            weight: "",
            pokeTypes: [],
            bulked:false
        })
        
       
    }
    
    const handleMainPage = () => {
        dispatch( getAllPokemons() )
    }
    return (
        <>
            <form 
            className="form"
            onSubmit={ handleSubmit }
            >
            <div className="pokeCreator">
                <div className="firstColumn">
                    <h2>Main Information</h2>
                    <div className="conteinerNameImgCreator">
                        <label className="labelNameCreator" htmlFor="">
                            Name *
                        </label>
                        <input 
                        className="inputNameCreator"
                        type="text"
                        name="pokeName"
                        placeholder="Pokemon's name"
                        value={ pokemon.name }
                        onChange={ inputValidator }
                        />
                    </div>
                    <div className="conteinerNameImgCreator">
                        <label className="labelNameCreator" htmlFor="">
                            {`Image (url)`}
                        </label>
                        <input 
                        className="inputNameCreator"
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
                                /* step={5} */
                                min="0" 
                                value={ pokemon.height }
                                
                                /* defaultValue={pokeCache.height} */
                                /* defaultValue={""} */
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelPhyCreator" htmlFor="">Weight</label>
                                <input 
                                className="inputPhyCreator"
                                type="number"
                                name="weight"
                                /* step={5} */
                                min="0" 
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.weight} */
                                value={ pokemon.weight }
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
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.attack} */
                                /* step={5} */
                                min="0" 
                                value={ pokemon.attack }
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Defense</label>
                                <input
                                className="inputBattleStatsCreator" 
                                type="number"
                                name="defense"
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.defense} */
                                /* step={5} */
                                min="0" 
                                value={ pokemon.defense }
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Hp</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="hp"
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.hp} */
                                /* step={5} */
                                min="0" 
                                value={ pokemon.hp }
                                onChange = { inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Speed</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="velocidad"
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.velocidad} */
                                /* step={5} */
                                min="0" 
                                value={ pokemon.velocidad }
                                onChange = { inputValidator }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="conteinerProblemsCreator">
                        <h2 className="titleProblemsCreator">Problems List</h2>
                        <ul className="problemsCreator">
                            {
                                Object.values( errorType ).map(( errorMessage, index ) => {
                                    return (
                                        <li className="itemError" key={ index }> {errorMessage }</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="probelmslistmessageContainer">
                            {
                                !errorType.name &&
                                !errorType.attack &&
                                !errorType.defense &&
                                !errorType.hp &&
                                !errorType.velocidad &&
                                !errorType.height &&
                                !errorType.weight &&
                                pokemon.name ?    
                                null :
                                <p className="probelmslistmessage">* Problems List must be empty to activate the create button</p>
                            }
                    </div>
                    <div className="conteinerBtnsCreator">
                        <div className="conteinerBtnMainCreator">
                            <Link to = '/home'>
                                <button 
                                className="btnMainCreator"
                                onClick={ handleMainPage }
                                >Main Page</button>
                            </Link>
                        </div>                      
                        <div className="conteinerSubmitCreator">
                        {   
                            !errorType.name &&
                            !errorType.attack &&
                            !errorType.defense &&
                            !errorType.hp &&
                            !errorType.velocidad &&
                            !errorType.height &&
                            !errorType.weight &&
                            pokemon.name ?
                            <input className="submitCreator" type="submit" value="Create!"/> : 
                            <input className="submitCreator" type="submit" value="Create!" disabled/>
                        }
                        </div>
                    </div>
                </div>
                {
                    !loading ?
                    <>
                        {
                            creating ?
                            <div className="thirdColumn" >
                                <h2>Preview</h2>
                                <PokePre 
                                poke = { pokemon }
                                />
                            </div> :
                            <div className="thirdColumn">
                                <div className="fantasma">

                            <AfterCreator id = { createdPokemon.id } />
                                </div>
                            </div>
                        }
                    </> :
                    <div className="thirdColumn">
                        <Loading />
                    </div>
                }
                <div className="secondColumn">
                        <h2>{`Types ( Optional )`}</h2>
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
                                           
                                           pokeCache.pokeTypes?.some( ele => ele === el.name ) 
                                           
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
            </div>
            </form> 
        </>
    )
}