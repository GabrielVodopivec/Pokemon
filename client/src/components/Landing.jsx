import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage () {

    return (
    <div className="landingPage">
        <Link to = '/home'>
        
            <button className="conteinerstartBtn"></button>
        
        </Link>
    </div>
    )
}

