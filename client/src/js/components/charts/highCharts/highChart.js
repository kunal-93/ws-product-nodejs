import React, { useState, useEffect, useReducer } from 'react'
import {Redirect} from "react-router-dom";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Helper imports
import getData from "components/../helpers/getData";
import reducer from "components/../helpers/graphOptionsReducer";

// import chart options
import defaultOptions from "./models/chartOptions";

const HighChart = ({url,endPoint, type, xLabel, selectedDate}) => {

    const [options, setOptionsDispatch] = useReducer(reducer, defaultOptions);
    const [redirectMessage, setRedirect] = useState("");

    const dataValidator = ({response, error}) => {
        if(error){
            setRedirect([error.response.status, error.response.statusText].join(": "));
        }
        else{
            setOptionsDispatch({response, endPoint, graphType: type, xLabel, selectedDate});
        }
    }

    // Get Data
    useEffect(() => {
        getData(url, dataValidator);
    },[url, type, selectedDate])

    if(redirectMessage && redirectMessage.length > 0){
        return(
            <Redirect to={{
                pathname: '/error',
                error: redirectMessage 
              }}
            />
        )
    }

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default HighChart;