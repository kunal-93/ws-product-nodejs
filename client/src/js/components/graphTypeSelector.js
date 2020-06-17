import React from "react";

const GraphTypeSelector = ({setType}) => {

    return(
        <div className="options">
            <span>Graph  Type</span>
            <button onClick={()=>setType("column")}>Bar</button>
            <button onClick={()=>setType("line")}>Line</button>
        </div>
    )
}

export default GraphTypeSelector;


