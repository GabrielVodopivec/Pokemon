import axios from 'axios';
import { BACK_TO_CREATOR, CLEAN_CACHE, EDITING_AGAIN, ERROR_SEARCH_BY_ID, ERROR_SEARCH_BY_NAME, EXISTENT_POKEMON, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_TYPES, LOADING, ORDER_ALPHABETICALLY, ORDER_BY_ATTACK, POKEMON_CREATED, RESET_CREATED, SEARCH_BY_ID, SEARCH_BY_NAME, SELECT_PAGE, SET_DETAIL } from '../actionTypes';

export const getAllPokemons = () => {
    return dispatch => {
        axios(`http://localhost:3001/pokemons`)
            .then(( resp ) => {
                console.log('getAllPokemons')
                return dispatch({
                type: GET_ALL_POKEMONS,
                payload: resp.data
                })
            })
            .catch(( error ) => {
                console.log( error.response.data )
            })
    }
};

export const getTypes = () => {
    return dispatch => {
        console.log('getTypes')
        axios(`http://localhost:3001/types`)
        .then(( response ) => {
            return dispatch({
            type: GET_TYPES,
            payload: response.data
        })})
        .catch(( error ) => {
            console.log( error )
        })
    }
}

export const searchByName = ( name ) => {
    return ( dispatch ) => {
        dispatch({
            type: LOADING
        })
        axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(( response ) => {
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        })
        .catch(( error ) => {
            return dispatch ({
                type: ERROR_SEARCH_BY_NAME,
                payload: error.response.data
            })
        })
    }
};

export const searchById = ( id ) => {
    return ( dispatch ) => {
        dispatch({
            type: LOADING
        })
        axios(`http://localhost:3001/detail/${id}`)
        .then(( pokemon ) => {
            return dispatch({
                type: SEARCH_BY_ID,
                payload: pokemon.data
            })
        })
        .catch(( error ) => {
            return dispatch({
                type: ERROR_SEARCH_BY_ID,
                payload: error.response.data
            })
        })
    }
}

export const filterByType = ( type ) => {
    return {
        type: FILTER_BY_TYPE,
        payload: type
    }
}

export const filterByOrigin = ( origin ) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}
export const orderByAttack = ( orderType ) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: orderType
    }
}

export const orderAlphabetically = ( orderType ) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload: orderType
    }
}

export const createPokemon = ({
    name,
    img,
    hp,
    attack,
    defense,
    velocidad,
    height,
    weight,
    pokeTypes
}) => {
    return ( dispatch ) => {
        dispatch({
            type: LOADING,
            payload: {
                name,
                img,
                hp,
                attack,
                defense,
                velocidad,
                height,
                weight,
                pokeTypes
            }
        })
        axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(() => {
            
            dispatch({
                type: EXISTENT_POKEMON
            })
        })
        .catch(() => {
            axios.post(`http://localhost:3001/pokemons`, {
                name,
                img,
                hp,
                attack,
                defense,
                velocidad,
                height,
                weight,
                pokeTypes
            })
            .then(( response ) => {
                console.log('se hizo el post')
                console.log(response.data)
                return dispatch({
                    type: POKEMON_CREATED,
                    payload: response.data
                })
            })
            .catch(( error ) => {
                console.log( error )
            })
        })
        
    }
}
export const backToCreator = () => {
    return {
        type: BACK_TO_CREATOR
    }
}
export const editingAgain = () => {
    return {
        type: EDITING_AGAIN
    }
}
export const selectPage = ( number ) => {
    return {
        type: SELECT_PAGE,
        payload: number
    }
}
export const resetCreator = () => {
    return {
        type: RESET_CREATED
    }
}
export const cleanCache = () => {
    return {
        type: CLEAN_CACHE
    }
}
export const setDetail = () => {
    return {
        type: SET_DETAIL
    }
}