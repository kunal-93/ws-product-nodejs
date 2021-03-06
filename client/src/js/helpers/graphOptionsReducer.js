/**
 * Reducer function to update the options of the graph based on the fetched data
 * @param {*} options Previous options received by the reduced
 * @param {*} param1 Action object to handle the appropriate action
 */
const reducer = (options, {endPoint, response, graphType, xLabel, selectedDate}) => {
    
    if(!response)
        return options

    let records = response.data;

    // if no records are found
    if(!response || records.length <=0 || xLabel == NaN)
        return options;

    const newOptions = {...options};
    
    // Set graph title
    newOptions.title.text = `${endPoint} - Year ${new Date(records[0].date).getUTCFullYear()}`;
    
    // Set Chart Type
    newOptions.chart.type = graphType;

    // if Chart is hourly, Filter the data for the date selected
    if(selectedDate && selectedDate.length > 0 ){
        records = records.filter(record=>selectedDate === (new Date(record.date)).toDateString())

        // Set tick interval to hourly
        newOptions.xAxis.tickInterval = 3600 * 1000
    }
    // Daily Chart
    else{
        // Set tick interval to Daily
        newOptions.xAxis.tickInterval = 24 * 3600 * 1000
    }

    // set data points
    let columns = Object.keys(records[0]);

    // Remove date columns and/or xlabel column 
    columns = columns.filter(column => column!== "date" && column!== xLabel);

    // Update the Data
    newOptions.series = columns.map(column => 
    {
        return {
            name: column,
            data: records.map(record=>{
        
                let xVal;
                // Process dates if they are to be shown on Xlabel
                const date = new Date(record.date);

                if(xLabel === "date"){
                    xVal =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                }
                else{
                    xVal =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                        parseInt(record[xLabel]), date.getUTCMinutes(), date.getUTCSeconds());
                }
               
                return [xVal , parseInt(record[column])]
            })
        }
    })

    return newOptions;
}

export default reducer;