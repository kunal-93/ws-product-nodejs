import React, {useState, useEffect} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
 
import getData from "../../helpers/getData";

import FrequencySelector from "../frequencySelector";
import GraphTypeSelector from "../graphTypeSelector";

const HourlyChartContainer = ({url, setFrequency, setType, selectDate, selectedDate}) =>{
    
    const [availableDates, setAvailableDates] = useState([]);

    const datesFiller = ({response}) => {
        const dates = [...new Set(response.data.map(record=>(new Date(record.date)).toDateString()))];
        setAvailableDates(dates);
        selectDate(dates[0]);
    }

    useEffect(()=>{
        getData(url, datesFiller);
    }, [url])
    

    return (
        <section >
            <div>
                <FrequencySelector className="options" setFrequency={setFrequency} />
            </div>
            <div>
                <GraphTypeSelector setType={setType} />
            </div>
            <div>
                <div className="date-dropdown">
                    <Dropdown options={availableDates}
                    onChange={e=>selectDate(e.value)} value={selectedDate} placeholder="Select a Date" />
                </div>
            </div>
        </section>
    )
}

export default HourlyChartContainer;

