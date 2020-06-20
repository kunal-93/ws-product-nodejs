import React from "react";
import MapContainer from "components/maps/worldMapContainer";
import {Header} from "./page";

const MapView = () => {
    
    return (
        <>
            <Header />
            <MapContainer endPoint="events/locations" metrics={["events"]} />
            <MapContainer endPoint="stats/locations" metrics={["impressions", "clicks", "revenue"]} />
        </>
    )
}

export default MapView;