import { useNavigate } from 'react-router-dom'

import { ListItem, ListItemButton, ListItemText } from '@mui/material'

import { useEffect, useState } from 'react'

import countryService from '../services/countries'

const CountriesList = () => {

    const [countries, setCountries] = useState([])


    useEffect(() => {
        countryService.getAll().then((countries) => setCountries(countries))
    }, [])

    countryService.getAll()


    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        navigate(`/info/${countryCode}`)
    }

    return (
        <div className="App">
            {countries &&
                countries.map((country) => {
                    return (                      

                        <ListItemButton  key={country.countryCode}
                            
                            onClick={() =>
                                handleNavigation(country.countryCode)
                            }
                        >
                            <ListItemText primary={country.name} />
                        </ListItemButton >
                    )
                })}
        </div>
    )
}

export { CountriesList }
