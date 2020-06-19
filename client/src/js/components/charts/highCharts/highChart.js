import React, { useState, useEffect, useReducer } from 'react'
import Highcharts, { objectEach } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Helper imports
import getData from "components/../helpers/getData";
import reducer from "components/../helpers/graphOptionsReducer";

// import chart options
import defaultOptions from "./models/chartOptions";

const HighChart = ({url,endPoint, type, xLabel, selectedDate}) => {

    const [options, setOptions] = useReducer(reducer, defaultOptions);
    // Get Data
    useEffect(() => {
        getData(url, setOptions, {endPoint, graphType: type, xLabel, selectedDate});
    },[url, type, selectedDate])

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default HighChart;