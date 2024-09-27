import { useNavigate } from 'react-router-dom'

import { ListItem, ListItemText } from '@mui/material'

const CountriesList = ({ countries }) => {
    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        navigate(`/info/${countryCode}`)
    }

    return (
        <div className="App">
            {countries &&
                countries.map((country) => {
                    return (
                        <ListItem
                            button
                            onClick={() =>
                                handleNavigation(country.countryCode)
                            }
                        >
                            <ListItemText primary={country.name} />
                        </ListItem>
                    )
                })}
        </div>
    )
}

export { CountriesList }
