const express = require('express')
const router = express.Router();
const {queryHandler} = require("../helpers/query");


/**
 * @swagger
 * /stats/locations:
 *  get:
 *      description: fetches daily stats and their locations
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
      SUM(impressions) AS impressions,
      SUM(clicks) AS clicks,
      SUM(revenue) AS revenue
    FROM public.hourly_stats AS H
    INNER JOIN public.poi AS P
    ON H.poi_id = P.poi_id
    GROUP BY H.date, P.name, P.lat, P.lon
    ORDER BY H.date
  `
  return next();
}, queryHandler)

/**
 * @swagger
 * /stats/hourly:
 *  get:
 *      description: fetches hourly stats
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
      SELECT date, hour, impressions, clicks, revenue
      FROM public.hourly_stats
      ORDER BY date, hour
      LIMIT 168;
    `
    return next()
    }, queryHandler)

/**
 * @swagger
 * /stats/daily:
 *  get:
 *      description: fetches daily stats
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
      SELECT date,
          SUM(impressions) AS impressions,
          SUM(clicks) AS clicks,
          SUM(revenue) AS revenue
      FROM public.hourly_stats
      GROUP BY date
      ORDER BY date
      LIMIT 7;
    `
    return next()
    }, queryHandler)

module.exports = router;
  