import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";


/**
 * This component cycles through the screen creating the following graph
 *  Screen0 -> Screen1 -> Screen2
 *     ^        |   ^          |
 *     |        v   |<------- <v
 *     <------------------------
 */
export const Component = () => {
    const navigate = useNavigate()
    const location = useLocation().pathname
    const nextLocation = location == "/" || location == "/2" ? "1" : "2"  // lookup ternary operator if this looks weird!
    const isScreen0 = location == "/"

    return(
        <div style={{ "display": "flex", "flexDirection" : "column" }}>
            <button data-testid="Component-Button-NextScreen"  onClick={() => {navigate(`/${nextLocation}`)}}>
                Go to Screen {nextLocation}
            </button>
            {!isScreen0 ? 
                <button data-testid="Component-Button-Home" onClick={() => {navigate("/")}}>
                    Home
                </button>
                :
                null
            }
        </div>

    )

}