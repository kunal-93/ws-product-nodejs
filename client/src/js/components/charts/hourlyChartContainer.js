import React, {useState, useEffect} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useHistory } from "react-router-dom";
 
import getData, {isValidError} from "../../helpers/getData";

import FrequencySelector from "../frequencySelector";
import GraphTypeSelector from "../graphTypeSelector";

const HourlyChartContainer = ({url, setFrequency, setType, selectDate, selectedDate}) =>{
    
    const history = useHistory();
    const [availableDates, setAvailableDates] = useState([]);
    
    /**
     * Fills the dates in the dropdown
     * @param {*} param0 
     */
    const datesFiller = ({response, error}) => {
        // if server did not give error, fill the data
        if(!isValidError(history, error)){
    
            // Get unique dates and store them as Strings for Date chooser
            const dates = [...new Set(response.data.map(record=>(new Date(record.date)).toDateString()))];
            setAvailableDates(dates);
            selectDate(dates[0]);
        }
    }

    // update the data if url changes
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

