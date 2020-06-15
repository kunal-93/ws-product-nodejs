const moment = require('moment');

const redis = require('redis');

// create and connect redis client to local instance.
let redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

// Print redis errors to the console
redisClient.on('error', (err) => {
    console.log("Error " + err);
  });

// Hashtable representing the memory of the server to store request logs
// const memory = new Map();
const MAX_REQUESTS = 10;
const WINDOW_SIZE_IN_HOURS = 1;

/**
 * Description: Request rate limiter limits the number of request per end point within a given time window
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requestRateLimiter = (req, res, next) => {

    try{
        // throw new Error if redis client does not exists
        if(!redisClient){
            throw new Error('Redis client does not exist!');
        }
        // Use user's IP as the user ID to identify the user 
        const userID = req.ip;

        // endPoint Path to apply rate limit for each end point
        const endPoint = req.path;

        // get record from the memory for the current user
        redisClient.get(userID, (err, userRecord) => {
            if(err) throw err;
            
            userRecord = JSON.parse(userRecord);
            
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

                        redisClient.set(userID, JSON.stringify(userRecord));

                        next();
                    }
                    // If window has not elapsed but there are no available tokens, return error
                    else if(endPointRecord.availableTokens <= 0){
                        res.statusMessage = "Too many requests";
                        res.status(429);
                        res.send( new Error(`Too many requests, only ${MAX_REQUESTS} requests are allowed in ${WINDOW_SIZE_IN_HOURS} hour.`));
                    }
                    // If tokens are available, process the request
                    else{
                        // Decrement available tokens
                        endPointRecord.availableTokens --;

                        redisClient.set(userID, JSON.stringify(userRecord));
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

                    redisClient.set(userID, JSON.stringify(userRecord));
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

                redisClient.set(userID, JSON.stringify(requestLog));
                // memory.set(userID, requestLog);
                next();
            }
        })
    }
    catch(err){
        next(err);
    };

    // console.log(`Endpoint: ${endPoint}, Tokens left: ${memory.get(userID)[endPoint].availableTokens}`);   
}

module.exports = requestRateLimiter;