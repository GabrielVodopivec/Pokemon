import React from "react";

const PokePre = ( props ) => {

    return (
        <div className="conteinerPrev">
            <div className="conteinerNamePrev">
                <h2>{ props.poke.name }</h2>
            </div>
            <h3>Physical Stats</h3>
            <div className="conteinerAltPesPrev">
                <div className="weightPrev" >
                    <div className="physicalTitlePrev">Height</div>
                    <div className="physicalValuePrev"> { props.poke.height } </div>
                </div>
                <div className="weightPrev" >
                    <div className="physicalTitlePrev">Weight</div>
                    <div className="physicalValuePrev"> { props.poke.weight } </div>
                </div>
            </div>
                <h3>{`Battle Stats & Types`}</h3>
            <div className="conteinerStatsTypesPrev">
                <div className="conteinerStatsPrev">
                    <div className="statsPrev">
                        <div className="battleTitlePrev">Attack</div>
                        <div className="battleValuePrev"> {props.poke.attack} </div>
                    </div>
                    <div className="statsPrev">
                        <div className="battleTitlePrev">Defense</div>
                        <div className="battleValuePrev"> {props.poke.defense} </div>
                    </div>
                    <div className="statsPrev">
                        <div className="battleTitlePrev">Hp</div>
                        <div className="battleValuePrev"> {props.poke.hp} </div>
                    </div>
                    <div className="statsPrev">
                        <div className="battleTitlePrev">Speed</div>
                        <div className="battleValuePrev"> {props.poke.velocidad} </div>
                    </div>
                </div>
                <div className="conteinerTypesPrev">
                    {props.poke.pokeTypes.map( (el, index) => {
                        return (
                            <div
                            key={ index } 
                            className= "typesPrev"
                            > { el } </div>
                        )
                    })}
                </div>
            </div>
            <div className="conteinerImgPrev">    
                <img className="ImgPrev" src={ props.poke.img } alt="Img not found" />
            </div>
        </div>
    )
}

export default PokePre;