const moment = require('moment');

// Hashtable representing the memory of the server to store request logs
const memory = new Map();
const MAX_REQUESTS = 10;
const WINDOW_SIZE_IN_HOURS = 1;

/**
 * Description: Request rate limiter limits the number of request per end point within a given time window
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requestRateLimiter = (req, res, next) => {
    // Use user's IP as the user ID to identify the user 
    const userID = req.ip;

    // endPoint Path to apply rate limit for each end point
    const endPoint = req.path;

    // get record from the memory for the current user
    const userRecord = memory.get(userID);

    // get current time from Moment
    const currentRequestTime = moment();

    // if user record exists for any end point
    if(userRecord){
        // if user record exists for current end point
        if(endPoint in userRecord){
            const endPointRecord = userRecord[endPoint];

            // Calculate window's end time
            const windowEndTime = moment.unix(endPointRecord.firstRequestTimeStamp)
                .add(WINDOW_SIZE_IN_HOURS, 'hours');
            
            // Window has elapsed if current time is greater than window end time, reset the window
            if(moment() > windowEndTime){
                // Mark this as the first request and save its timestamp
                endPointRecord.firstRequestTimeStamp = currentRequestTime.unix();
                // reset the available tokens
                endPointRecord.availableTokens = MAX_REQUESTS - 1;

                next();
            }
            // If window has not elapsed but there are no available tokens, return error
            else if(endPointRecord.availableTokens <= 0){
                res.statusMessage = "Too many requests";
                res.status(409);
                res.send(`Too many requests, only ${MAX_REQUESTS} requests are allowed in ${WINDOW_SIZE_IN_HOURS} hour.`);
            }
            // If tokens are available, process the request
            else{
                // Decrement available tokens
                endPointRecord.availableTokens --;
                // pass the request
                next();
            }
        }
        // if user record does not exists for current endpoint
        else{
            const requestEndpointLog = {
                firstRequestTimeStamp: currentRequestTime.unix(),
                availableTokens: MAX_REQUESTS - 1
            };

            userRecord[endPoint] = requestEndpointLog;

            next();
        }
    }
    // if user record does not exists i.e. add the new user.
    else{
        const requestEndpointLog = {
            firstRequestTimeStamp: currentRequestTime.unix(),
            availableTokens: MAX_REQUESTS - 1
        };
        const requestLog = {};
        requestLog[endPoint] = requestEndpointLog;

        memory.set(userID, requestLog);
        next();
    }

    // console.log(`Endpoint: ${endPoint}, Tokens left: ${memory.get(userID)[endPoint].availableTokens}`);
   
}

module.exports = requestRateLimiter;