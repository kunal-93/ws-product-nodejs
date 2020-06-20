const express = require('express')
const router = express.Router();
const {queryHandler} = require("../helpers/query");

/**
 * @swagger
 * /events/locations:
 *  get:
 *      description: fetches daily events and their locations
 *      responses:
 *          200:
 *              description: OK
 *          429: 
 *              description: Too many requests
 *          500:
 *              description: Internal server error
 */
router.get('/locations', (req, res, next) => {
  req.sqlQuery = `
    SELECT H.date, P.name, P.lat, P.lon,
      SUM(H.events) AS events
    FROM public.hourly_events AS H
    INNER JOIN public.poi AS P
    ON H.poi_id = P.poi_id
    GROUP BY H.date, P.name, P.lat, P.lon
    ORDER BY H.date
  `
  return next();
}, queryHandler)

/**
 * @swagger
 * /events/hourly:
 *  get:
 *      description: fetches hourly events
 *      responses:
 *          200:
 *              description: OK
 *          429: 
 *              description: Too many requests
 *          500:
 *              description: Internal server error
 */
router.get('/hourly', (req, res, next) => {
    req.sqlQuery = `
      SELECT date, hour, events
      FROM public.hourly_events
      ORDER BY date, hour
      LIMIT 168;
    `
    return next()
  }, queryHandler)
  
/**
 * @swagger
 * /events/daily:
 *  get:
 *      description: fetches daily events
 *      responses:
 *          200:
 *              description: OK
 *          429: 
 *              description: Too many requests
 *          500:
 *              description: Internal server error
 */
router.get('/daily', (req, res, next) => {
    req.sqlQuery = `
        SELECT date, SUM(events) AS events
        FROM public.hourly_events
        GROUP BY date
        ORDER BY date
        LIMIT 7;
    `
    return next()
    }, queryHandler)

module.exports = router;