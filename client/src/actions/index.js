import axios from 'axios';
import { BACK_TO_CREATOR, BULK_CREATE, CHECK_BULK, CLEAN_CACHE, DELETE_POKEMON, EDITING_AGAIN, ERROR_CREATED, ERROR_SEARCH_BY_ID, ERROR_SEARCH_BY_NAME, EXISTENT_POKEMON, FAIL_UPDATE, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_TYPES, LOADING, ORDER_ALPHABETICALLY, ORDER_BY_ATTACK, POKEMON_CREATED, RESET_CREATED, RESET_UPDATING, SEARCH_BY_ID, SEARCH_BY_NAME, SELECT_PAGE, SET_DETAIL, UPDATE_POKEMON } from '../actionTypes';

export const getAllPokemons = () => {
    return dispatch => {
        axios(`/pokemons`)
            .then(( resp ) => {
                // console.log('getAllPokemons')
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
        dispatch({
            type: LOADING,
        })
        
        // console.log('getTypes')
        axios(`/types`)
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
        axios(`/pokemons?name=${name.trim()}`)
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
        axios(`/detail/${id}`)
        .then(( pokemon ) => {
            dispatch({
                type: SEARCH_BY_ID,
                payload: pokemon.data
            })
        })
        .catch(( error ) => {
            console.log(error.response)
            dispatch({
                type: ERROR_SEARCH_BY_ID,
                payload: ('invalid ID')
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
    pokeTypes,
    bulked
}) => {
    return ( dispatch ) => {
        dispatch({
            type: LOADING,
        })
        
        axios(`/pokemons?name=${name.trim()}`)
        .then(() => {
            dispatch({
                type: "FILL_CACHE",
                payload: {
                name,
                img,
                hp,
                attack,
                defense,
                velocidad,
                height,
                weight,
                pokeTypes,
                bulked
                }
            })
            dispatch({
                type: EXISTENT_POKEMON
            })
            
        })
        .catch(() => {
            axios.post(`/pokemons`, {
                name,
                img,
                hp,
                attack,
                defense,
                velocidad,
                height,
                weight,
                pokeTypes,
                bulked
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
                console.log(error.response.data)
                dispatch({
                    type: "FILL_CACHE",
                    payload: {
                    name,
                    img,
                    hp,
                    attack,
                    defense,
                    velocidad,
                    height,
                    weight,
                    pokeTypes,
                    bulked
                    }
                })
                dispatch({
                    type:ERROR_CREATED,
                    payload: error.response.data
                })
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
export const deletePokemon = ( id ) => {
    return ( dispatch ) => {
        axios.delete(`/pokemons/${id}`)
        .then(( response ) => dispatch({
            type: DELETE_POKEMON,
            payload: response.data
        }))
        .catch(( error ) => {
            console.log( error )
        });
    }
}
export const bulkCreate = () => {
    return ( dispatch ) => {

        axios.post(`/pokeomons/bulkCreate`)
        
        .then( () => {
            console.log("Bulk Done")
            return dispatch({
                type: BULK_CREATE
            })
        })
        .catch(() => {
            console.log("hubo problemas con el bulk")
        })
    }
}
export const checkBulk = () => {
    return {
        type: CHECK_BULK
    }
}

export const updatePokemon = ({
    id,
    name,
    img,
    hp,
    attack,
    defense,
    velocidad,
    height,
    weight,
    pokeTypes,
    bulked
}) => {
    return (dispatch) => {
        dispatch({
            type: LOADING
        })
        axios.put(`/pokemons/update/${id}`, {
            name,
            img,
            hp,
            attack,
            defense,
            velocidad,
            height,
            weight,
            pokeTypes,
            bulked
        })
        .then(( response ) => {
            console.log(response.data.up)
            return dispatch({
                type: UPDATE_POKEMON,
                payload: response.data
            })
        })
        .catch(( error ) => {
            console.log ( error.response.data )
            dispatch({
                type: FAIL_UPDATE,
                payload: error.response.data
            })
        })
    }
}

export const resetUpdating = () => {
    return {
        type: RESET_UPDATING
    }
}

