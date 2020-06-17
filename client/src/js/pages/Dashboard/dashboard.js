import React from "react";
import ChartContainer from "components/ChartContainer";

const Dashboard = () => {
    return (
        <>
            <ChartContainer endPoint="events" />
            <ChartContainer endPoint="stats" />
        </>
    )
}

export default Dashboard;