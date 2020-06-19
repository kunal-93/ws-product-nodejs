import React, { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import ReactTooltip from "react-tooltip";

// Custom Components import
import Map from "./map";

import Config from 'Config';
const baseUrl = Config.serverUrl;

// Helpers import
import getData from "../../helpers/getData";

const MapContainer = ({endPoint, metrics}) => {

    const url = [baseUrl, endPoint].join("/");

    const [data, setData] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, selectDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMetric, selectMetric] = useState("");
    const [tooltipContent, setTooltipContent] = useState("");

    const datesFiller = data => {
        const dates = [...new Set(data.map(record=>record.date))];
        setAvailableDates(dates);
        selectMetric(metrics[0]);
        selectDate(dates[0]);
    }

    const dataFiller = ({response}) => {
        const cleanData = response.data.map(record=>{
            return {...record,
                    date: (new Date(record.date)).toDateString()
                }
            });

        setData(cleanData);
        datesFiller(cleanData);
    }

    useEffect(()=>{
        setFilteredData(data.filter(record=>record.date === selectedDate))
    },[selectedDate])

    useEffect(()=>{
        getData(url, dataFiller);
    }, [])

    console.log("Main ", tooltipContent)
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