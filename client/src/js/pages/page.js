import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return(
        <header>
            <h1 className="center-align">Welcome to EQ Works</h1>
            <h2 className="center-align">Please select any option to see the magic</h2>
            <nav className="nav-bar">
                <Link className="button" to="/">Home</Link>
                <Link className="button" to="/graphView">Graph View</Link>
                <Link className="button" to="/tableView">Table View</Link>
                <Link className="button" to="/mapView">Map View</Link>
            </nav>
        </header>
    )
}