import React from "react";
import TableContainer from "components/tables/tableContainer";
import POITableContainer from "components/tables/poiTableContainer"
import {Header} from "./page";

const TableView = () => {

    return (
        <>
            <Header />
            <POITableContainer endPoint="poi" searchableColumns={["name"]}/>
            <TableContainer endPoint="events" defaultFrequency="daily" searchableColumns={["date"]}/>
            <TableContainer endPoint="stats" defaultFrequency="daily" searchableColumns={["date"]} />
        </>
    )
}

export default TableView;