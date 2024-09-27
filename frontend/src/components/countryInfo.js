import { useNavigate, useParams } from 'react-router-dom'

import {
    Box,
    Grid,
    ListItem,
    ListItemButton,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material'
import countryService from '../services/countries'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

const CountryInfo = () => {
    const [loaded, setloaded] = useState(false)

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
                setloaded(true)
            })
            .catch((error) => {
                console.error('Error fetching country info:', error)
                setError('Failed to fetch country info')
            })
    }, [countryCode])

    useEffect(() => {
        if (country.population !== 'error' && country.population) {
            let X = []
            let Y = []
            country.population.forEach((population) => {
                X.push(population.year)
                Y.push(population.value)
            })
            setChartParams({ x: X, y: Y })
        }
    }, [country])

    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        setloaded(false)
        setCountry([])
        navigate(`/info/${countryCode}`)
    }

    if (!loaded) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    justifyContent: 'center',
                    marginBottom: '5rem',
                }}
            >
                <Skeleton width="40%" />

                <Skeleton variant="rectangular" width={210} height={118} />

                <Box sx={{ pt: 0.5 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="15%" />

                    <Skeleton width="10%" />

                    <Skeleton width="12%" />
                </Box>

                <Skeleton variant="rectangular" width={250} height={250} />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography sx={{ textAlign: 'start' }}>
                {country.officialName}
            </Typography>
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
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                    }}
                >
                    <Box>
                        <Typography
                            sx={{ textAlign: 'start', fontWeight: 'bold' }}
                        >
                            Boder countries
                        </Typography>

                        {country.borders &&
                            country.borders.map((border) => {
                                return (
                                    <ListItemButton
                                        key={border.countryCode}
                                        onClick={() =>
                                            handleNavigation(border.countryCode)
                                        }
                                    >
                                        <ListItemText
                                            primary={border.commonName}
                                        />
                                    </ListItemButton>
                                )
                            })}
                    </Box>
                    <Box>
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
            </Box>
        </Box>
    )
}

export { CountryInfo }
