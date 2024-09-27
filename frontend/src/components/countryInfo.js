import { useNavigate, useParams } from 'react-router-dom'

import { Box, ListItem, ListItemText, Typography } from '@mui/material'
import countryService from '../services/countries'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

const CountryInfo = () => {
    const [country, setCountry] = useState([])
    const [chartParams, setChartParams] = useState({ x: [], y: [] })

    const { countryCode } = useParams()

    const [error, setError] = useState(null)

    useEffect(() => {
        countryService
            .getInfo(countryCode)
            .then((country) => {
                setCountry(country)
                setError(null)
            })
            .catch((error) => {
                console.error('Error fetching country info:', error)
                setError('Failed to fetch country info')
            })
    }, [countryCode])

    useEffect(() => {
        console.log('here it is')
        console.log(country.population)

        if (country.population !== 'error' && country.population) {
            let X = []
            let Y = []
            country.population.forEach((population) => {
                X.push(population.year)
                Y.push(population.value)
            })
            setChartParams({ x: X, y: Y })
            console.log(X)
        }
    }, [country])

    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        navigate(`/info/${countryCode}`)
    }

    return (
        <Box>
            <Typography>{country.officialName}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '11rem',
                    aling: 'center',
                }}
            >
                <img
                    style={{ width: '11rem', height: '11rem' }}
                    src={country.flag}
                    alt={`${country.officialName} flag`}
                />
                <Typography sx={{ fontWeight: 'bold' }}>
                    Boder countries
                </Typography>

                {country.borders &&
                    country.borders.map((border) => {
                        return (
                            <ListItem
                                button
                                onClick={() =>
                                    handleNavigation(border.countryCode)
                                }
                            >
                                <ListItemText primary={border.commonName} />
                            </ListItem>
                        )
                    })}

                <LineChart
                    xAxis={[{ data: chartParams.x }]}
                    series={[
                        {
                            data: chartParams.y,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </Box>
        </Box>
    )
}

export { CountryInfo }
