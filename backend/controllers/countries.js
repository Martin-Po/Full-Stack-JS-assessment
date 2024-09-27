const countriesRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')

const middleware = require('../utils/middleware')

countriesRouter.get('/', async (request, response) => {
    try {
        const { data: countries } = await axios.get(config.COUNTRIES_URL)
        response.json(countries)
    } catch (error) {
        console.error(error)
        response.status(500).json({ error: 'Failed to fetch countries' })
        next(exception)
    }
})

countriesRouter.get('/:country', async (request, response) => {
    const countryCode = request.params.country
    let CompleteCountry = {}
    let errors = []

    try {
        const { data: country } = await axios.get(
            `${config.COUNTRY_INFO_URL}/${countryCode}`
        )
        CompleteCountry = country
    } catch (exception) {
        errors.push({ error: 'Failed to fetch country info' })
    }

    try {
        const { data: population } = await axios.post(
            `${config.COUNTRY_POPULATION_URL}`,
            {
                country: CompleteCountry.commonName,
            }
        )
        CompleteCountry.population = population.data.populationCounts
    } catch (exception) {
        errors.push({ error: 'Failed to fetch country population' })
    }

    try {
        const { data: flags } = await axios.post(`${config.COUNTRY_FLAG_URL}`, {
            country: CompleteCountry.commonName,
        })
        CompleteCountry.flag = flags.data.flag
    } catch (exception) {
        errors.push({ error: 'Failed to fetch country flag' })
    }

    if (errors.length > 0) {
        response.status(500).json({ errors, data: CompleteCountry })
    } else {
        response.json(CompleteCountry)
    }
})

module.exports = countriesRouter
