import './App.css'
import { CountriesList } from './components/countriesList'


import { useEffect, useState } from 'react'

import countryService from './services/countries'
import { Route, Routes } from 'react-router-dom'
import { CountryInfo } from './components/countryInfo'

function App() {
    const [loaded, setloaded] = useState(false)
    const [countries, setCountries] = useState([])

    useEffect(() => {
        countryService.getAll().then((countries) => setCountries(countries))
    }, [])

    countryService.getAll()

    return (
        <div className="App">
           <Routes>
           <Route path="/info/:countryCode" element={<CountryInfo />} />

            <Route path="/*" element={<CountriesList countries = {countries} />} />

           </Routes>
        </div>
    )
}

export default App
