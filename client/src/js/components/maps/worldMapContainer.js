import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import ReactTooltip from "react-tooltip";

// Custom Components import
import Map from "./map";

const baseUrl = SERVER_URL;

// Helpers import
import getData, {isValidError} from "../../helpers/getData";


const MapContainer = ({endPoint, metrics}) => {

    const url = [baseUrl, endPoint].join("/");

    const history = useHistory();
    const [data, setData] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, selectDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMetric, selectMetric] = useState("");
    const [tooltipContent, setTooltipContent] = useState("");

    /**
     * Fill the metrics dates in drop down
     * @param {*} data 
     */
    const datesFiller = data => {
        const dates = [...new Set(data.map(record=>record.date))];
        setAvailableDates(dates);
        selectMetric(metrics[0]);
        selectDate(dates[0]);
    }

    /**
     * Fills the Data for maps
     * @param {*} param0 
     */
    const dataFiller = ({response, error}) => {

        if(!isValidError(history, error)){
            // convert the data in string format
            const cleanData = response.data.map(record=>{
                return {...record,
                        date: (new Date(record.date)).toDateString()
                    }
                });

            setData(cleanData);
            datesFiller(cleanData);
        }
    }

    // Filter the data based on new date selection
    useEffect(()=>{
        setFilteredData(data.filter(record=>record.date === selectedDate))
    },[selectedDate])

    useEffect(()=>{
        getData(url, dataFiller);
    }, [endPoint])
    
    return (
        <section className="section">
            <h3 className="center-align">{`${endPoint.split("/").join("-")} Data Map`}</h3>
            <div className="date-dropdown">
                <Dropdown options={availableDates}
                onChange={e=>selectDate(e.value)} value={selectedDate} placeholder="Select a Date" />
            </div>
            <div className="date-dropdown">
                <Dropdown options={metrics}
                onChange={e=>selectMetric(e.value)} value={selectedMetric} placeholder="Select a Date" />
            </div>
            <Map data={filteredData} selectedMetric={selectedMetric} setTooltipContent={setTooltipContent}/>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
        </section>  
    )
    
}

export default MapContainer;