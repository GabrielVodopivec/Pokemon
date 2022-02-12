import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, updatePokemon, searchById, getAllPokemons } from "../actions";


import AfterEditor from "./AfterEditor";
import Loading from "./Loading";
import PokePre from "./PokePre";

class PokeEditor extends Component {

    
    constructor (props) {
        super ( props );
        
        this.state = {
            pokemon: {
                id: 0,
                name: "",
                img:  "",
                hp:  0,
                attack:  0,
                defense:  0,
                velocidad:  0,
                height:  0,
                weight:  0,
                pokeTypes: [],
                bulked:false
            },
            
            errorType: {
                name: "",
                attack: "",
                defense: "",
                hp: "",
                velocidad: "",
                height: "",
                weight: ""
            }
        }
    }
    componentDidMount() {
        this.props.getTypes()
        this.setState({
            ...this.state,
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
                pokeTypes: this.props.pokeDetail.types?.map(el => el.name),
                bulked:false
            }

        })

    }
    
    inputValidator = (event) => {
        
        switch ( event.target.name ) {
            case "pokeName":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        name: event.target.value
                    }
                })
            case "pokeImg":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        img: event.target.value
                    }
                })
            case "height":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        height: event.target.value
                    }
                })
            case "weight": 
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        weight: event.target.value
                    }
                })
            case "attack":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        attack: event.target.value
                    }
                })
            case "defense":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        defense: event.target.value
                    }
                })
            case "hp":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        hp: event.target.value
                    }
                })
            case "velocidad":
                return this.setState({
                    ...this.state,
                    pokemon: {
                        ...this.state.pokemon,
                        velocidad: event.target.value
                    }
                })
            case "type":
                
                console.log(event.target.value)
                console.log(event.target.checked)
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

    }

    handleMainPage = () => {
        this.props.getAllPokemons()
    }

    
    handleSubmit = ( event ) => {
        event.preventDefault()
        const pokeToUpdate = this.state.pokemon;
        
        this.props.updatePokemon( pokeToUpdate )
    }
    render() {
        
        return(
            <form 
            /* className="form" */
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
                        placeholder="Nombre del pokemon"
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
                                defaultValue={ this.props.pokeDetail.height }
                                
                                /* defaultValue={pokeCache.height} */
                                /* defaultValue={""} */
                                onChange = { this.inputValidator }
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
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.attack} */
                                /* step={5} */
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
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.defense} */
                                /* step={5} */
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
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.hp} */
                                /* step={5} */
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
                                /* defaultValue={""} */
                                /* defaultValue={pokeCache.velocidad} */
                                /* step={5} */
                                min="0" 
                                defaultValue={ this.props.pokeDetail.velocidad }
                                onChange = { this.inputValidator }
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="conteinerProblemsCreator">
                        <h2 className="titleProblemsCreator">Problems</h2>
                        <ul className="problemsCreator">
                            {
                                Object.values( this.state.errorType ).map(( errorMessage, index ) => {
                                    return (
                                        <li key={ index }> {errorMessage }</li>
                                    )
                                })
                            }
                        </ul>
                    </div> */}
                    
                    <div className="conteinerBtnsCreator">
                        <div className="conteinerBtnMainCreator">
                            <Link to = '/home'>
                                <button 
                                className="btnMainCreator"
                                onClick={ this.handleMainPage }
                                >Main Page</button>
                            </Link>
                        </div>                      
                        <div className="conteinerSubmitCreator">
                        {   
                            !this.state.errorType.name &&
                            !this.state.errorType.attack &&
                            !this.state.errorType.defense &&
                            !this.state.errorType.hp &&
                            !this.state.errorType.velocidad &&
                            !this.state.errorType.height &&
                            !this.state.errorType.weight &&
                            this.state.pokemon.name ?
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

                            <AfterEditor />
                                </div>
                            </div>
                        }
                    </> :
                    <div className="thirdColumn">
                        <Loading />
                    </div>
                }
                <div className="secondColumn">
                        <h2>Types</h2>
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
                                            this.props.pokeDetail.types?.some(e => e.name === el.name)
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
    }
    
}

const mapStateToProps = ( state ) => {
    return {
        pokeDetail: state.pokeDetail,
        updating: state.updating,
        creating: state.creating,
        loading: state.loading,
        types: state.types
        
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        getAllPokemons: () => dispatch( getAllPokemons() ),
        getTypes: () => dispatch( getTypes() ),
        updatePokemon: ( pokemon ) => dispatch( updatePokemon( pokemon )),
        searchById: ( id ) => dispatch( searchById( id ))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PokeEditor )