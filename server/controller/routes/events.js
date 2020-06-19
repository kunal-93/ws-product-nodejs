const express = require('express')
const router = express.Router();
const {queryHandler} = require("../helpers/query");

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