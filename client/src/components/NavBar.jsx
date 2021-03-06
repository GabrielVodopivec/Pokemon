import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SearchByName from "./SearchByName";
import PaginadoButtons from "./PaginadoButtons";
import FilterByType from "./FilterByType"
import PaginadoArrows from "./PaginadoArrows";
import OrderByAttack from "./OrderByAttack";
import OrderAlphabetically from "./OrderAlphabetically";
import FilterByOrigin from "./FilterByOrigin";

import { bulkCreate, getAllPokemons, resetCreator } from "../actions";

export default function NavBar () {

    const dispatch = useDispatch();
    const pokeQuantity = useSelector( state => state.pokemons );
    const errorSearchByName = useSelector( state => state.errorSearchByName );
    const needBulk = useSelector( state => state.needBulk );

    const handleBtnCreate = () => {
        dispatch( resetCreator() );
    };

    const handleClick = ( event ) => {
        event.preventDefault();
        dispatch( getAllPokemons() );
    };

    const handleBulk = () => {
        dispatch( bulkCreate() );
    };

    return (
        <div className="interiorNavbar">
            <div className="principalTitle">
                 <img className="titile" src="https://24.media.tumblr.com/232a91726b505a0e8ef44648ca7cc854/tumblr_mjflojSWnr1s1byhpo1_500.gif" alt="Img not found" />
            </div>
            <div className="quantity">
                { 
                    !errorSearchByName.length ? 
                    pokeQuantity.length > 1 ?
                    <div>We found {pokeQuantity.length} pokemons </div> :
                    <div>We found {pokeQuantity.length} pokemon </div> :
                    null
                }
            </div>
                <span id="motion"></span>
            <div className="conteinerSearchByNameNav">
                <SearchByName />
            </div>

            <div className="conteinerPaginadoNav">
                <PaginadoButtons />
                <PaginadoArrows />
            </div>
            <div className="conteinerFiltersNav">
                <FilterByType />
                <FilterByOrigin />
            </div>
        
            <div className="conteinerOrderNav">
                <OrderByAttack />
                <OrderAlphabetically />
            </div>
            <div className="createPokemonNav">
                <h2>Create your own Pokemon!</h2>
            <div>
                <Link to = '/pokecreator'>
                    <button
                    className="BtnCreatePokemonsNav"
                    onClick={ handleBtnCreate }
                    >
                        Create!
                    </button>
                </Link>
            </div>
            <div className="bulkbtnNav">
                {
                    needBulk ? 
                    <button
                    className="BtnCreatePokemonsNav"
                    onClick={ handleBulk }
                    >
                        BulkCreator
                    </button> : 
                    <button
                    disabled
                    className="BtnCreatePokemonsNav"
                    onClick={ handleBulk }
                    >
                        BulkCreator
                    </button>
                }
            </div>
            <div className="conteinerBtnAllPokemonsNav">
                <button
                className="BtnAllPokemonsNav"
                onClick={ handleClick }
                >
                    Show All Pokemons
                </button>
            </div>
            </div>
        </div>
    )
};