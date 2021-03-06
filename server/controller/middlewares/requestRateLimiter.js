const moment = require('moment');

const redis = require('redis');

// Get env vars from .env file
require('dotenv').config({path:"./.env"})

// create redist Client
let redisClient;

// Handle redis client for prod
if (process.env.REDISTOGO_URL) {
    // redistogo connection
    const rtg   = require("url").parse(process.env.REDISTOGO_URL);
    redisClient = redis.createClient(rtg.port, rtg.hostname);

    redisClient.auth(rtg.auth.split(":")[1]);
}
else{
    redisClient = redis.createClient();
}

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

// Print redis errors to the console
redisClient.on('error', (err) => {
    console.log("Error " + err);
  });

const MAX_REQUESTS = 25;
const WINDOW_SIZE_IN_HOURS = 1;

/**
 * Description: Request rate limiter limits the number of request per end point within a given time window
 * In this demo scenario, MAX Requests is kept in the server and is set in the server
 * In production, Every user's Request limit should be kept in the DB and be different of each user.
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
                
                next();
            }
        })
    }
    catch(err){
        next(err);
    };
}

module.exports = requestRateLimiter;