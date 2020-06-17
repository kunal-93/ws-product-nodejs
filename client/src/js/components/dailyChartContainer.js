import React from "react";

import FrequencySelector from "./frequencySelector";
import GraphTypeSelector from "./graphTypeSelector";

const DailyChartContainer = ({setFrequency, setType}) =>{
    
    return (
        <section>
            <div>
                <FrequencySelector setFrequency={setFrequency} />
            </div>
            <div>
                <GraphTypeSelector setType={setType} />
            </div>
        </section>
    )
}

export default DailyChartContainer;

