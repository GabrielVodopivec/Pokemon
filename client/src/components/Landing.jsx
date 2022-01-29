import React from "react";

import { Link } from "react-router-dom";

export default function LandingPage () {

    return (
    <div className="landingPage">
        <div className="conteinerstartBtn" >
        <Link to = '/home'>
            <button className="startBtn"> GET IN ! </button>
        </Link>
        </div>
    </div>
    )
}

