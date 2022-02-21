import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTypes, updatePokemon, searchById, getAllPokemons } from "../actions";

import AfterEditor from "./AfterEditor";
import Loading from "./Loading";
import PokePre from "./PokePre";

class PokeEditor extends Component {
    
    constructor ( props ) {
        super ( props );
        this.state = {
            pokemon: {
                id: this.props.pokeDetail.id,
                name: this.props.pokeDetail.name,
                img:  this.props.pokeDetail.img,
                hp:  this.props.pokeDetail.hp,
                attack:  this.props.pokeDetail.attack,
                defense:  this.props.pokeDetail.defense,
                velocidad:  this.props.pokeDetail.velocidad,
                height:  this.props.pokeDetail.height,
                weight:  this.props.pokeDetail.weight,
                pokeTypes: this.props.pokeDetail.types.map(el => el.name),
                bulked:false
            },
            errorType: {
                name: "",
                weight: "",
                height: "",
                attack: "",
                defense: "",
                hp: "",
                velocidad: "",
            }
        };
    };
    
    inputValidator = ( event ) => {
        const regExpNum = /^-[0-9]/;
        const regExpName = /[^a-zA-Z\s\-().]/;
        switch ( event.target.name ) {
            case "pokeName":
                
                if ( !event.target.value.length ) {
                    return this.setState({
                        
                        errorType: {
                            ...this.state.errorType,
                            name: "The pokemon must have a name"
                        }
                    })
                } else if ( regExpName.test( event.target.value) ) {
                    return this.setState({
                        errorType: {
                            ...this.state.errorType,
                            name: "The pokemon's name can not contain special characters "
                        }
                    })
                } else {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            name: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            name: ""
                        }
                    })
                }
            case "pokeImg":
                return this.setState({
                    pokemon: {
                        ...this.state.pokemon,
                        img: event.target.value
                    }
                })
            case "height": 
                if( !event.target.value.length || 
                    regExpNum.test( event.target.value ) || 
                    (event.target.value > 1000) || 
                    (event.target.value < 0) ) {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            height: ""
                        },
                        errorType: {
                            ...this.state.errorType,
                            height: "Height must be a number between 0 - 1000"
                        }
                    })
                } else {
                    return this.setState({   
                        pokemon: {
                            ...this.state.pokemon,
                            height: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            height: ""
                        }
                    })
                }
            case "weight": 
            if( !event.target.value.length || 
                regExpNum.test( event.target.value ) || 
                (event.target.value > 1000) || 
                (event.target.value < 0) ) {
                return this.setState({
                    pokemon: {
                        ...this.state.pokemon,
                        weight: ""
                    },
                    errorType: {
                        ...this.state.errorType,
                        weight: "Weight must be a number between 0 - 1000"
                    }
                })
            } else {
                return this.setState({   
                    pokemon: {
                        ...this.state.pokemon,
                        weight: event.target.value
                    },
                    errorType: {
                        ...this.state.errorType,
                        weight: ""
                    }
                })
                }
            case "attack":
                
                if( !event.target.value.length || 
                    regExpNum.test( event.target.value ) || 
                    (event.target.value > 200) || 
                    (event.target.value < 0) ) {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            attack: ""
                        },
                        errorType: {
                            ...this.state.errorType,
                            attack: "Attack must be a number between 0 - 200"
                        }
                    })
                } else {
                    return this.setState({   
                        pokemon: {
                            ...this.state.pokemon,
                            attack: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            attack: ""
                        }
                    })
                }
            case "defense":
                if( !event.target.value.length || 
                    regExpNum.test( event.target.value ) || 
                    (event.target.value > 200) || 
                    (event.target.value < 0) ) {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            defense: ""
                        },
                        errorType: {
                            ...this.state.errorType,
                            defense: "Defense must be a number between 0 - 200"
                        }
                    })
                } else {
                    return this.setState({   
                        pokemon: {
                            ...this.state.pokemon,
                            defense: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            defense: ""
                        }
                    })
                }
            case "hp":
                if( !event.target.value.length || 
                    regExpNum.test( event.target.value ) || 
                    (event.target.value > 200) || 
                    (event.target.value < 0) ) {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            hp: ""
                        },
                        errorType: {
                            ...this.state.errorType,
                            hp: "Hp must be a number between 0 - 200"
                        }
                    })
                } else {
                    return this.setState({   
                        pokemon: {
                            ...this.state.pokemon,
                            hp: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            hp: ""
                        }
                    })
                }
            case "velocidad":
                if( !event.target.value.length || 
                    regExpNum.test( event.target.value ) || 
                    (event.target.value > 200) || 
                    (event.target.value < 0) ) {
                    return this.setState({
                        pokemon: {
                            ...this.state.pokemon,
                            velocidad: ""
                        },
                        errorType: {
                            ...this.state.errorType,
                            velocidad: "Speed must be a number between 0 - 200"
                        }
                    })
                } else {
                    return this.setState({   
                        pokemon: {
                            ...this.state.pokemon,
                            velocidad: event.target.value
                        },
                        errorType: {
                            ...this.state.errorType,
                            velocidad: ""
                        }
                    })
                }
            case "type":
                return this.setState(() => {
                    if ( event.target.checked ) {
                        return {
                            ...this.state,
                            pokemon: {
                                ...this.state.pokemon,
                                pokeTypes: [
                                    ...this.state.pokemon.pokeTypes,
                                     event.target.value
                                    ]
                            }
                        }

                    } else {
                        let filtered = [];
                        let i = 0;
                        while ( i < this.state.pokemon.pokeTypes.length ) {
                            if ( this.state.pokemon.pokeTypes[i] !== event.target.value )
                            filtered = [
                                ...filtered,
                                this.state.pokemon.pokeTypes[i]
                            ]
                            i++
                        }
                        return {
                            ...this.state,
                            pokemon: {
                                ...this.state.pokemon,
                                pokeTypes: filtered
                            }
                        }
                    }
                })
                
            default: break;

        }

    };

    problems () {
        return !this.state.errorType.name &&
        !this.state.errorType.attack &&
        !this.state.errorType.defense &&
        !this.state.errorType.hp &&
        !this.state.errorType.velocidad &&
        !this.state.errorType.height &&
        !this.state.errorType.weight &&
        this.state.pokemon.name ?
        true:
        false
    };

    handleMainPage = () => {
        this.props.getAllPokemons()
    };

    handleSubmit = ( event ) => {
        event.preventDefault()
        const pokeToUpdate = this.state.pokemon;
        
        this.props.updatePokemon( pokeToUpdate )
    };

    render() {
        
        return(
            <form 
            onSubmit={ this.handleSubmit }
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
                        defaultValue={ this.props.pokeDetail.name }
                        onChange={ this.inputValidator }
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
                        defaultValue={ this.props.pokeDetail.img }
                        pattern="https://.*" size="30"
                        required 
                        onChange={ this.inputValidator }
                        />
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
                                defaultValue={ this.props.pokeDetail.height }
                                onChange = { this.inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelPhyCreator" htmlFor="">Weight</label>
                                <input 
                                className="inputPhyCreator"
                                type="number"
                                name="weight"
                                min="0" 
                                defaultValue={ this.props.pokeDetail.weight }
                                onChange = { this.inputValidator }
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
                                min="0" 
                                defaultValue={ this.props.pokeDetail.attack }
                                onChange = { this.inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Defense</label>
                                <input
                                className="inputBattleStatsCreator" 
                                type="number"
                                name="defense"
                                min="0" 
                                defaultValue={ this.props.pokeDetail.defense }
                                onChange = { this.inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Hp</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="hp"
                                min="0" 
                                defaultValue={ this.props.pokeDetail.hp }
                                onChange = { this.inputValidator }
                                />
                            </div>
                            <div className="battleStatCreator">
                                <label className="labelBattleCreator" htmlFor="">Speed</label>
                                <input 
                                className="inputBattleStatsCreator"
                                type="number"
                                name="velocidad"
                                min="0" 
                                defaultValue={ this.props.pokeDetail.velocidad }
                                onChange = { this.inputValidator }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="conteinerProblemsCreator">
                        <h2 className="titleProblemsCreator">Problems List</h2>
                        <ul className="problemsCreator">
                            {
                                Object.values( this.state.errorType ).map(( errorMessage, index ) => {
                                    return (
                                        <li className="itemError" key={ index }> {errorMessage }</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="probelmslistmessageContainer">
                            {
                                this.problems() ?   
                                null :
                                <p className="probelmslistmessage">* Problems List must be empty to activate the Update button</p>
                            }
                    </div>
                    <div className="conteinerBtnsCreator">
                        <div className="conteinerBtnMainCreator">
                            <Link to = '/home'>
                                <button 
                                className="btnMainCreator"
                                onClick={ this.handleMainPage }
                                >
                                    Main Page
                                </button>
                            </Link>
                        </div>                      
                        <div className="conteinerSubmitCreator">
                        {   
                            this.problems() ?
                            <input className="submitCreator" type="submit" value="Update!"/> : 
                            <input className="submitCreator" type="submit" value="Update!" disabled/>
                        }
                        </div>
                    </div>
                </div>
                {
                    !this.props.loading ?
                    <>
                        {
                            this.props.updating ?
                            <div className="thirdColumn" >
                                <h2>Preview</h2>
                                <PokePre 
                                poke = { this.state.pokemon }
                                />
                            </div> :
                            <div className="thirdColumn">
                                <div className="fantasma">
                                    < AfterEditor id = {this.props.pokeDetail.id } />
                                </div>
                            </div>
                        }
                    </> :
                    <div className="thirdColumn">
                        <div className="fantasma">
                            <Loading />
                        </div>
                    </div>
                }
                <div className="secondColumn">
                        <h2>Types ( Optional )</h2>
                    <div className="typesConteiner">
                        {
                            this.props.types.map(( el, index ) => {
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
                                        value={ el.name }
                                        onChange={ this.inputValidator } 
                                        defaultChecked = {
                                            this.props.pokeDetail.types?.some(( e ) => e.name === el.name)
                                        }
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
        )
    };  
};

const mapStateToProps = ( state ) => {
    return {
        pokeDetail: state.pokeDetail,
        updating: state.updating,
        creating: state.creating,
        loading: state.loading,
        types: state.types
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        getAllPokemons: () => dispatch( getAllPokemons() ),
        getTypes: () => dispatch( getTypes() ),
        updatePokemon: ( pokemon ) => dispatch( updatePokemon( pokemon )),
        searchById: ( id ) => dispatch( searchById( id ))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( PokeEditor );