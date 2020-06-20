import React, {useState} from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
    Marker
  } from "react-simple-maps";


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// helper imports
import {colorScale, getMinMax, findNewCoordinates} from "../../helpers/math";

const markersMemo = new Map();
const offSetMemo = new Map();

const MapElement = ({data, selectedMetric, setTooltipContent}) => {
    
    markersMemo.clear();
    offSetMemo.clear();

    // find Min Max based on the selectedMetric
    const minMax = getMinMax(data, selectedMetric);

    const markers = data.map(record=>{
        const {lon, lat} = record;
        // markers and text labels are diverted a bit to show the cluster and not stacking all markers on top of each other 
        const coordinates = findNewCoordinates(markersMemo, lon, lat, 1);
        const markerOffsets = findNewCoordinates(offSetMemo, lon, lat, 20);

        return {
            name: record.name,
            coordinates: coordinates,
            markerOffsetX: markerOffsets[0] - lon,
            markerOffsetY: markerOffsets[1] - lat,
            color: colorScale(minMax)(record[selectedMetric]),
            toolTipText: `${record.name}: ${record[selectedMetric]} ${selectedMetric}`
        }
    });

    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const zoomInHandler = () => {
        if (position.zoom <= 8)
            setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    const zoomOutHandler = () => {
        if (position.zoom > 1)
            setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    const handleMoveEnd = (position) => {
        setPosition(position);
    }

    return (
        <div>
        <ComposableMap data-tip="">
            <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
            >
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                geographies.map(geo => {
                    return (
                        <Geography key={geo.rsmKey} geography={geo}
                            style={{
                                default: {
                                    fill: "#D6D6DA",
                                    outline: "none"
                                },
                                hover: {
                                    fill: "yellow",
                                    outline: "none"
                                }
                            }}
                        />
                        )}
                    )
                }
            </Geographies>

            {markers.map(({ name, color, coordinates, markerOffsetX, markerOffsetY, toolTipText}) => {
                
                return (
                    <Marker key={name} coordinates={coordinates}
                        onMouseEnter={() => setTooltipContent(toolTipText)}
                        onMouseLeave={() => setTooltipContent("")}
                    >
                        <g
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-15, -30)"
                        >
                            <circle cx="12" cy="10" r="2" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        <text
                            textAnchor="middle"
                            x={markerOffsetX}
                            y={markerOffsetY}
                            style={{ fontFamily: "system-ui", fill: color , fontSize: ".7em"}}
                    
                        >
                            {name}
                        </text>
                    </Marker>
                )}
            )}
            </ZoomableGroup>
        </ComposableMap>
        <div className="controls">
            <span>Zoom Options</span>
            <button className="button" onClick={zoomInHandler}>+</button>
            <button className="button" onClick={zoomOutHandler}>-</button>
        </div>
    </div>
    );
};

export default MapElement;