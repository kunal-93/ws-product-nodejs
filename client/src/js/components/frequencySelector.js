import React from "react";

const FrequencySelector = ({setFrequency, className=""}) => {

    return(
        <div className={className}>
            <span>Frequency</span>
            <button onClick={()=>setFrequency("daily")}>Daily</button>
            <button onClick={()=>setFrequency("hourly")}>Hourly</button>
        </div>
    )
}

export default FrequencySelector;