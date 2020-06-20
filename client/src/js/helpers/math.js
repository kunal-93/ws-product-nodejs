import { scaleQuantize } from "d3-scale";

/**
 * Calculates the min and max value from an object column/Key
 * and returns as array [min, max]
 * @param {*} arr 
 * @param {*} key 
 */
export const getMinMax = (arr, key) => {
    if(arr.length<=0)
        return;

    let min = arr[0][key];
    let max = arr[0][key];
    let len = arr.length;

    for (let i=1; i < len; i++) {
        let curr = arr[i][key];
        min = (curr < min) ? curr : min;
        max = (curr > max) ? curr : max;
    }
  
    return [min, max];
}

/**
 * Used to map a value to the approriate color based on the intensity
 * @param {*} minMax array of min and max value [min, max]
 */
export const colorScale = (minMax) =>
    scaleQuantize()
        .domain(minMax)
        .range([
            "#a8a032",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ])

// Logic to find the new lon and latitude is store the integer value of coordinates as center 
// and set offsets on the boundary of the circle with radius as r (2 taken here)
export const findNewCoordinates = (memo, lon, lat, r) => {

    const key = [parseInt(lon), parseInt(lat)].join(",");
    // if record exists, find the last angle at which marker was set, set the new one a few degrees away
    let angle = memo.has(key) ? memo.get(key) + 5: 0;
    
    const newLon = r * Math.sin(angle) + lon;
    const newLat =  r * Math.cos(angle) + lat;

    // update the angle
    memo.set(key, angle);

    return [newLon, newLat];
}