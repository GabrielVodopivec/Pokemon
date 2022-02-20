import { 
    BACK_TO_CREATOR, 
    BULK_CREATE, 
    CHECK_BULK, 
    CLEAN_CACHE, 
    DELETE_POKEMON, 
    EDITING_AGAIN, 
    ERROR_CREATED, 
    ERROR_SEARCH_BY_ID, 
    ERROR_SEARCH_BY_NAME, 
    EXISTENT_POKEMON, 
    FAIL_UPDATE, 
    FILTER_BY_ORIGIN, 
    FILTER_BY_TYPE, 
    GET_ALL_POKEMONS, 
    GET_TYPES, LOADING, 
    ORDER_ALPHABETICALLY,
    ORDER_BY_ATTACK, 
    POKEMON_CREATED, 
    RESET_CREATED, 
    RESET_UPDATING, 
    SEARCH_BY_ID, 
    SEARCH_BY_NAME, 
    SELECT_PAGE, 
    SET_DETAIL,
    UPDATE_POKEMON } from "../actionTypes";

const initialState = {
    allPokemons: [],
    pokemons: [],
    types:[],
    pokeDetail: {},
    inDetail: false,
    createdPokemon: {},
    pokeCache:{},
    back: false,
    createAnother: false,
    updating: true,
    creating: true,
    created: false,
    errorCreated:"",
    updated:false,
    deleted: false,
    loading: false,
    needBulk: false,
    activeFilter: "",
    messageUpdate: "",
    errorSearchByName: "",
    errorSearchById: "",
    page: 1,
    pokemonsPerPage: 12
};

const rootReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case POKEMON_CREATED: 
        return {
            ...state,
            creating: false,
            loading:false,
            
            pokeCache:{},
            createdPokemon: action.payload.pokemonCreated,
            created: action.payload.wasCreated
            }
        case ERROR_CREATED:
            return {
                ...state,
                creating:false,
                created:false,
                loading:false,
                errorCreated: action.payload
            }
        case DELETE_POKEMON:
            return {
                ...state,
                deleted: true
            }
        case EXISTENT_POKEMON:
            return {
                ...state,
                creating:false,
                created:false,
                loading:false,
            }
        case CLEAN_CACHE:
            return{
                ...state,
                pokeCache:{}
            }
        case BACK_TO_CREATOR:
            return {
                ...state,
                back:true,
                creating:true,
                errorCreated:""
            }
        case EDITING_AGAIN:
            return {
                ...state,
                back:false
            }
        case RESET_CREATED:
            return {
                ...state,
                activeFilter: "",
                pokeCache:{},
                created:false,
                createAnother: true,
                creating:true
            }
        case SET_DETAIL: 
        return {
            ...state,
            inDetail:true,
            }
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
                loading: false,
                inDetail:true,
                deleted: false,
                activeFilter: "",
                errorSearchByName: "",
                errorSearchById: "",
                page: 1
            }
        case GET_TYPES:
            return {
                ...state,
                loading:false,
                types: action.payload
            }    
        case SEARCH_BY_NAME:
            return {
                ...state,
                activeFilter: "",
                errorSearchByName:"",
                loading: false,
                pokemons: action.payload,
                page: 1,
            }
        case "FILL_CACHE":
            return {
                ...state,
                pokeCache:action.payload
            }
        case LOADING:
            return {
                ...state,
                
                loading: true
            }
        case ERROR_SEARCH_BY_NAME:
            return {
                ...state,
                errorSearchByName: action.payload,
                loading: false
            }
        case SEARCH_BY_ID:
            return {
                ...state,
                pokeDetail:action.payload,
                loading: false
            }
        case ERROR_SEARCH_BY_ID:
            return {
                ...state,
                errorSearchById: action.payload,
                loading: false
            }  
        case FILTER_BY_TYPE:
            const toFilter = state.allPokemons;
            const filtered = ( arreglo ) => {
                const arr = [];
                for( let i = 0; i < arreglo.length; i++) {
                    if ( arreglo[i].types.some( type => type.name === action.payload.toLocaleLowerCase())) {
                        arr.push( arreglo[i] )
                    }
                }
                return arr
            }  
            if ( action.payload === "All" ) { 
                return {
                    ...state,
                    activeFilter: "",
                    errorSearchByName: "",
                    pokemons:toFilter,
                    page: 1
                }
            } else if ( filtered( toFilter ).length) {
                return {
                    ...state,
                    errorSearchByName: "",
                    activeFilter: action.payload,
                    pokemons: filtered( toFilter ),
                    page: 1
                }
            } else {
                return {
                    ...state,
                    errorSearchByName: `There's not ${action.payload.toUpperCase()} type pokemons`
                }
            }
        case FILTER_BY_ORIGIN:
            const toFilterByOrigin = state.allPokemons;
            if ( action.payload === "db") {

                const fromDb = toFilterByOrigin.filter(( pokemon ) => {
                    return pokemon.fromdb
                })
                if ( fromDb.length ) {
                    return {
                        ...state,
                        page: 1,
                        activeFilter: "",
                        errorSearchByName: "",
                        pokemons: fromDb
                    }
                } else {
                    return {
                        ...state,
                        page: 1,
                        activeFilter: "",
                        errorSearchByName: "There's no pokemons in Data Base"
                    }
                }
                
            } else {
                const fromApi = toFilterByOrigin.filter(( pokemon ) => {
                    return !pokemon.fromdb
                })
                return {
                    ...state,
                    page: 1,
                    activeFilter: "",
                    errorSearchByName:"",
                    pokemons: fromApi
                }
            }    
        case ORDER_BY_ATTACK:
            const toOrderByAttack = state.pokemons;
            const attackOrder = ( array ) => {
                
                if( array.length <= 1 ) return array;

                let pivot = array[0];
                let left = [];
                let right = [];

                for ( let i = 1; i < array.length; i++ ) {
                    if( array[i].attack < pivot.attack ) {
                        left.push( array[i] );
                    } else {
                        right.push( array[i] );
                    }
                }
                /* console.log("ordenando") */
                switch ( action.payload ) {
                    case 'ASC':
                        return [ ...attackOrder( left ), pivot, ...attackOrder( right ) ];
                    case 'DSC':
                        return [ ...attackOrder( right ), pivot, ...attackOrder( left ) ];
                    default: break;
                }
                return array;
            }
            return {
                ...state,
                page: 1,
                pokemons: attackOrder( toOrderByAttack )
            }
        case ORDER_ALPHABETICALLY:
            const ToOrderAlphabetically = state.pokemons;
            const alphabeticOrder = ( array ) => {
                if ( array.length <= 1) return array;
                let pivot = array[0];
                let left = [];
                let right = [];
                for ( let i = 1; i < array.length; i++ ) {
                    if ( array[i].name.toLocaleLowerCase() < pivot.name.toLocaleLowerCase() ) {
                        left.push( array[i] );
                    } else {
                        right.push( array[i] );
                    }
                };
                if ( action.payload === "ASC" ) {
                    return [ ...alphabeticOrder( left ), pivot, ...alphabeticOrder( right ) ]
                }
                if ( action.payload === "DSC" ) {
                    return [ ...alphabeticOrder( right ), pivot, ...alphabeticOrder( left ) ]
                } else {
                    return array;
                }
            }    
            return {
                ...state,
                page: 1,
                pokemons: alphabeticOrder( ToOrderAlphabetically )
            }    
        case SELECT_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case BULK_CREATE:
            return {
                ...state,
                inDetail:false,
                bulkDone: true
            }
        case CHECK_BULK:
            const pokes = state.allPokemons;
            const bulked = pokes.some(( poke ) => {
                return poke.bulked
            })
            if ( !bulked ) {
                return {
                    ...state,
                    needBulk: true,
                }
            } else {
                return {
                    ...state,
                    needBulk: false
                }
            }    
        case UPDATE_POKEMON: 
            return {
                ...state,
                loading:false,
                updating:false,
                updated:true,
                pokeDetail:action.payload.up,
                messageUpdate: action.payload.data
            }
        case RESET_UPDATING:
            return {
                ...state,
                updating: true,
                updated: false,
                
            }
        case FAIL_UPDATE:
            return {
                ...state,
                loading:false,
                updating:false,
                messageUpdate: action.payload.data
            }
        default: return state
    }
};

export default rootReducer;