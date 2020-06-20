import React, { useState, useEffect } from "react";
import fuzzy from "fuzzy";
import { v4 as uuidv4 } from 'uuid';
import {useHistory} from "react-router-dom";

// Custom Components import
import Table from "./table";
import FrequencySelector from "../frequencySelector";

import Config from 'Config';
const baseUrl = Config.serverUrl;

// Helpers import
import getData, {isValidError} from "../../helpers/getData";

const options = {
    pre: "<b>",
    post: "</b>",
};

const TableContainer = ({endPoint, defaultFrequency="", searchableColumns=[]}) => {

    // update the searchable columns based on the searchableColumns property passed
    options.extract = el => searchableColumns.map(col=>el[col]).join("")

    const makeUrl = (frequency) => {
        return [baseUrl, endPoint, frequency].join("/")
    }

    const history = useHistory();
    const [frequency, setFrequency] =  useState(defaultFrequency);
    const [url, setUrl] = useState(makeUrl(frequency));
    const [data, setData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [searchMatches, setSearchMatches] = useState([]);

    /**
     * Fills the Data in the table
     * @param {*} param0 props
     */
    const dataFiller = ({response, error}) => {
    
        if(!isValidError(history, error)){
            console.log("inside");
            const cleanData = response.data.map(record=>{
                // Format Date if present
                if(record.date){
                    return {...record,
                            date: (new Date(record.date)).toDateString()
                        }
                    }
                else{
                    return record;
                }
            });
            
            setData(cleanData);
            setSearchMatches(cleanData.map(record => {
                return {...record,
                    key: uuidv4()
                    }
                }
            ));
        }
    }

    useEffect(()=>{
        setUrl(makeUrl(frequency));
        getData(url, dataFiller);
          
    }, [frequency, url])

    // update matches based on the entered search keyword
    useEffect(()=>{
        const results = fuzzy.filter(searchWord, data, options);
        setSearchMatches(results.map(e => {
                return {...e.original,
                    key: uuidv4()
                    }
                }
            ));
    }, [searchWord])

    return (
        <section className="section">
            <h3 className="center-align">{`${frequency} ${endPoint} Data Table`}</h3>
            <div className="center-align">
                <input
                    type="text"
                    placeholder={`Search for ${searchableColumns.toString()}`}
                    value={searchWord}
                    onChange={e=>setSearchWord(e.target.value)}
                />
            </div>
            <FrequencySelector className="centered-flex" setFrequency={setFrequency} />
            <Table searchMatches= {searchMatches} searchWord={searchWord}/>
        </section>  
    )
    
}

export default TableContainer;