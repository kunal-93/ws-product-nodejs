import React, { useState, useEffect } from "react";
import fuzzy from "fuzzy";
import { v4 as uuidv4 } from 'uuid';

// Custom Components import
import Table from "./table";

import Config from 'Config';
const baseUrl = Config.serverUrl;

// Helpers import
import getData from "../../helpers/getData";

const options = {
    pre: "<b>",
    post: "</b>",
};

const TableContainer = ({endPoint, searchableColumns=[]}) => {
    
    options.extract = el => searchableColumns.map(col=>el[col]).join("")

    const [data, setData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [searchMatches, setSearchMatches] = useState([]);

    const dataFiller = ({response}) => {
        const cleanData = response.data.map(record=>{
            // Format Date is present
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

    useEffect(()=>{
        const url = [baseUrl, endPoint].join("/");
        getData(url, dataFiller);
    }, [])

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
            <h3 className="center-align">{`${endPoint} Data Table`}</h3>
            <div className="center-align">
                <input
                    type="text"
                    placeholder={`Search for ${searchableColumns.toString()}`}
                    value={searchWord}
                    onChange={e=>setSearchWord(e.target.value)}
                />
            </div>
            <Table searchMatches= {searchMatches} searchWord={searchWord}/>
        </section>  
    )
    
}

export default TableContainer;