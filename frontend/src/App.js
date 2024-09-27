import './App.css'
import { CountriesList } from './components/countriesList'

import { useState } from 'react'

import HomeIcon from '@mui/icons-material/Home';

import { Route, Routes, useNavigate } from 'react-router-dom'
import { CountryInfo } from './components/countryInfo'
import { Box, IconButton } from '@mui/material'

function App() {
    const navigate = useNavigate()

    const handleNavigation = (countryCode) => {
        navigate(`/`)
    }

    return (
        <div className="App">
            <Box sx={{ width: '100%', display: 'flex' }}>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleNavigation()}
                >
                    <HomeIcon fontSize="inherit" />
                </IconButton>
            </Box>
            <Routes>
                <Route path="/info/:countryCode" element={<CountryInfo />} />

                <Route path="/*" element={<CountriesList />} />
            </Routes>
        </div>
    )
}

export default App
