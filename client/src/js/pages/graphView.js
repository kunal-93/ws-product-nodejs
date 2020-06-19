import React from "react";
import ChartContainer from "components/charts/chartContainer";
import {Header} from "./page";

const GraphView = () => {
    return (
        <>
            <Header />
            <ChartContainer endPoint="events" />
            <ChartContainer endPoint="stats" />
        </>
    )
}

export default GraphView;