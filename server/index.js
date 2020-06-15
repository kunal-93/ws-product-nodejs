const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {swaggerOptions} = require('./controller/helpers/swagger');
//Import Rate limiter
const requestRateLimiter  = require( "./controller/middlewares/requestRateLimiter");

// Get env vars from .env file
require('dotenv').config({path:"./.env"})

const app = express()

// use middleware requestRateLimiter for each request
app.use(requestRateLimiter);

// load Controller routes
const generalController = require('./controller/routes/general');
const statsController = require('./controller/routes/stats');
const eventsController = require('./controller/routes/events');

// map controller to app object
app.use('/', generalController);
app.use('/stats', statsController);
app.use('/events', eventsController);

// setup Swagger docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})

