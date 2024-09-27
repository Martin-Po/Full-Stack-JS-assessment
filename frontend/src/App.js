import './App.css'
import { CountriesList } from './components/countriesList'


import {  useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { CountryInfo } from './components/countryInfo'

function App() {
    const [loaded, setloaded] = useState(false)

    return (
        <div className="App">
           <Routes>
           <Route path="/info/:countryCode" element={<CountryInfo />} />

            <Route path="/*" element={<CountriesList  loaded = {loaded} />} />

           </Routes>
        </div>
    )
}

export default App
