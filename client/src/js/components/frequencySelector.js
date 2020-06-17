import React from "react";

const FrequencyChooser = ({setFrequency}) => {

    return(
        <div className="options">
            <span>Frequency</span>
            <button onClick={()=>setFrequency("daily")}>Daily</button>
            <button onClick={()=>setFrequency("hourly")}>Hourly</button>
        </div>
    )
}

export default FrequencyChooser;