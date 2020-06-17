import React, { useState, useEffect } from "react";
import HighChart from "./HighChart/highChart";

// import graph containers as per frequency
import HourlyChartContainer from "./hourlyChartContainer";
import DailyChartContainer from "./dailyChartContainer";

const baseUrl = "http://localhost:5555";



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

    if(frequency === "hourly"){
        return (
            <>
                <HourlyChartContainer url={url} setFrequency={setFrequency} setType={setType} selectedDate={selectedDate} selectDate={selectDate} />
                <HighChart endPoint={endPoint} url={url} type={type} xLabel="hour" selectedDate={selectedDate}/>
            </>  
        )
    }
    else{
        return (
            <>
                <DailyChartContainer setFrequency={setFrequency} setType={setType} />
                <HighChart endPoint={endPoint} url={url} type={type} xLabel="date" />
            </>  
        )
    }
}

export default ChartContainer;