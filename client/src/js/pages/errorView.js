import React from "react";

const ErrorPage = ({location}) => {
    
    return(
        <div className="center-align">
            <h1>Sorry, your request can't be processed</h1>
            <h2>Error Details- {location.error} </h2>
        </div>
    )
}

export default ErrorPage;