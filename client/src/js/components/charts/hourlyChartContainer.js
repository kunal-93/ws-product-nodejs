import React, {useState, useEffect} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Redirect} from "react-router-dom";
 
import getData from "../../helpers/getData";

import FrequencySelector from "../frequencySelector";
import GraphTypeSelector from "../graphTypeSelector";

const HourlyChartContainer = ({url, setFrequency, setType, selectDate, selectedDate}) =>{
    
    const [availableDates, setAvailableDates] = useState([]);
    const [redirectMessage, setRedirect] = useState("");
    
    const datesFiller = ({response, error}) => {
        if(error){
            setRedirect([error.response.status, error.response.statusText].join(": "));
        }
        else{
            const dates = [...new Set(response.data.map(record=>(new Date(record.date)).toDateString()))];
            setAvailableDates(dates);
            selectDate(dates[0]);
        }
    }

    useEffect(()=>{
        getData(url, datesFiller);
    }, [url])
    
    if(redirectMessage && redirectMessage.length > 0){
        return(
            <Redirect to={{
                pathname: '/error',
                error: redirectMessage 
              }}
            />
        )
    }

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

