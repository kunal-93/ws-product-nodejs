# ws-product-nodejs
Product developer work samples - Node.js variant

1. Front End Track - https://eq-works-sample.netlify.app/  
2. Back End Track - https://eq-works-sample.herokuapp.com/
3. API Docs - https://eq-works-sample.herokuapp.com/api-docs/

# Front End Track
Data source - eq works
Visualization options
1. Graph View - Bar and Line Graph
Features: <br>
  1.1 Daily View - Shows the data with days on xLabel fetched from the DB <br>
  1.2 Hourly view - Shows the data with hours on xLabel based on a particular days. <br> User can select the date using date-selector drop down to see the hourly data for the selected date <br> <br>
  
2. Table View - Table showing the fetched datasets 
Features: <br>
  2.1 Daily Data <br>
  2.2 Hourly Data <br>
  2.3 Table supports fuzzy search <br>
  
3. Map View - Shows the markers and names based on the location coordinates fetched from DB. 
Features:<br>
  3.1 Supports Zoom in and Zoom out <br>
  3.2 Multiple Markers and Names on the same coordinate are put on the circumference of a circe (with center as coordinates) to avoid stacking and better user experience <br>
  3.3 Markers are colored from lightRed to Dark Red based on the intesity of the data <br>
  3.4 Date selector and Metric selector Dropdown available
  3.5 Hovering over Markers shows the exact Data of the metric selected by the metric selector dropdown <br>
  
# Backend Track
api-rate-limiter uses token-bucket logic with redis as database.
Features: <br>
1. Memory efficient - Stores data in the nested object format {USERID : {endPoint1: { availableTokens : Number } } }
2. Fast Data access using key value pairs
3. Reliable - Using Redis store as server store which is fast and reliable
4. Persistant - Incase of Redis server crash, Redis config can be configured to make the store peristent and keep backing up
5. Live API documentation using swagger

created by [Kunal Dhawan](https://github.com/kunal-93)

  
