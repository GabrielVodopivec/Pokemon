import axios from 'axios';
import { GET_ALL_POKEMONS } from '../actionTypes';

export const getAllPokemons = () => {
    return dispatch => {
        axios(`http://localhost:3001/pokemons`)
            .then(( resp ) => {
                console.log('se despacho')
                return dispatch({
                type: GET_ALL_POKEMONS,
                payload: resp.data
                })
            })
            .catch(( error ) => {
                console.log( error.response.data )
            })
    }
}