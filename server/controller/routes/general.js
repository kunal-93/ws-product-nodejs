const express = require('express')
const router = express.Router();
const {queryHandler} = require("../helpers/query");

router.get('/', (req, res) => {
    res.send('Welcome to EQ Works 😎')
  })

/**
 * @swagger
 * /poi:
 *  get:
 *      description: Gets poi data
 *      responses:
 *          200:
 *              description: OK
 *          429: 
 *              description: Too many requests
 *          500:
 *              description: Internal server error
 */
router.get('/poi', (req, res, next) => {
    req.sqlQuery = `
        SELECT *
        FROM public.poi;
    `
    return next()
    }, queryHandler)

module.exports = router;