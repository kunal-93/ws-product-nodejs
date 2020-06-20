import React, { useState, useEffect, useReducer } from 'react'
import {useHistory} from "react-router-dom";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Helper imports
import getData, {isValidError} from "components/../helpers/getData";
import reducer from "components/../helpers/graphOptionsReducer";

// import chart options
import defaultOptions from "./models/chartOptions";

const HighChart = ({url,endPoint, type, xLabel, selectedDate}) => {

    const history = useHistory();

    const [options, setOptionsDispatch] = useReducer(reducer, defaultOptions);

    const dataValidator = ({response, error}) => {
        if(!isValidError(history, error)){
            setOptionsDispatch({response, endPoint, graphType: type, xLabel, selectedDate});
        }
    }

    // Get Data
    useEffect(() => {
        getData(url, dataValidator);
    },[url, type, selectedDate])

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default HighChart;