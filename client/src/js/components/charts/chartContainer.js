import React, { useState, useEffect } from "react";
import HighChart from "./highCharts/highChart";

// import graph containers as per frequency
import HourlyChartContainer from "./hourlyChartContainer";
import DailyChartContainer from "./dailyChartContainer";

const baseUrl = SERVER_URL;

const ChartContainer = ({endPoint}) => {
    
    const makeUrl = (frequency) => {
        return [baseUrl, endPoint, frequency].join("/")
    }

    const [frequency, setFrequency] =  useState("daily");
    const [type, setType] =  useState("column");
    const [url, setUrl] = useState(makeUrl(frequency));
    const [selectedDate, selectDate] = useState("");

    useEffect(()=>{
        setUrl(makeUrl(frequency));
    }, [url, frequency])

    if(frequency === "hourly" && url.includes("hourly")){
        return (
            <div className="section">
                <HourlyChartContainer url={url} setFrequency={setFrequency} setType={setType} selectedDate={selectedDate} selectDate={selectDate} />
                <HighChart endPoint={endPoint} url={url} type={type} xLabel="hour" selectedDate={selectedDate}/>
            </div>  
        )
    }
    else{
        return (
            <div className="section">
                <DailyChartContainer setFrequency={setFrequency} setType={setType} />
                <HighChart endPoint={endPoint} url={url} type={type} xLabel="date" />
            </div>  
        )
    }
}

export default ChartContainer;