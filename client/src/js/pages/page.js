import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return(
        <header>
            <h1 className="center-align">Welcome to EQ Works</h1>
            <h2 className="center-align">Please use below Links to see the magic</h2>
            <nav className="nav-bar">
                <Link to="/">Home</Link>
                <Link to="/graphView">Graph View</Link>
                <Link to="/tableView">Table View</Link>
                <Link to="/mapView">Map View</Link>
            </nav>
        </header>
    )
}