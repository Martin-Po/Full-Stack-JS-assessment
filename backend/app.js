const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const countriesRouter = require('./controllers/countries')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const path = require('path')

console.log(process.env.NODE_ENV)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/countries', countriesRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
