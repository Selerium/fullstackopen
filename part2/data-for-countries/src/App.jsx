import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => response.data)
        .then((data) => setCountries(data))
    }

    fetchData();
  }, [])

  return (
    <>
      <div>
        find countries <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      {filteredCountries.length == 1 ?
        <>
         <h1>{filteredCountries[0].name.common}</h1>
         <p>Capital {filteredCountries[0].capital[0]}</p>
         <p>Area {filteredCountries[0].area}</p>
         <h2>Languages</h2>
         <ul>
          {Object.values(filteredCountries[0].languages).map((value) => <li key={value}>{value}</li>)}
         </ul>
         <img alt={filteredCountries[0].flags.alt} src={filteredCountries[0].flags.png} />
        </>
        : <>
        {(filteredCountries.length > 0 && filteredCountries.length <= 10) && filteredCountries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => setSearch(country.name.common)}>Show</button></p>)}
        {search && filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
        </>
      }
    </>
  )
}

export default App
