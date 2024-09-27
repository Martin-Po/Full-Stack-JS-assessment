import { useNavigate } from 'react-router-dom'

import {
    Box,
    ListItem,
    ListItemButton,
    ListItemText,
    Skeleton,
} from '@mui/material'

import { useEffect, useState } from 'react'

import countryService from '../services/countries'

const CountriesList = () => {
    const [countries, setCountries] = useState([])
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        countryService.getAll().then((countries) => {
            setCountries(countries)
            setloaded(true)
        })
    }, [])

    countryService.getAll()

    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        navigate(`/info/${countryCode}`)
    }

    if (!loaded) {
        const skeletonItems = []

        for (let x = 0; x < 6; x++) {
            skeletonItems.push(
                <Box>
                    <Skeleton width="12%" />
                    <Skeleton width="15%" />

                    <Skeleton width="10%" />
                    <Skeleton width="13%" />
                    <Skeleton width="8%" />
                    <Skeleton width="5%" />
                    <Skeleton width="15%" />

                    <Skeleton width="12%" />
                </Box>
            )
        }
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    justifyContent: 'center',
                    marginBottom: '5rem',
                }}
            >
                <Box sx={{ pt: 0.5 }}>{skeletonItems}</Box>
            </Box>
        )
    }

    return (
        <div className="App">
            {countries &&
                countries.map((country) => {
                    return (
                        <ListItemButton
                            key={country.countryCode}
                            onClick={() =>
                                handleNavigation(country.countryCode)
                            }
                        >
                            <ListItemText primary={country.name} />
                        </ListItemButton>
                    )
                })}
        </div>
    )
}

export { CountriesList }
