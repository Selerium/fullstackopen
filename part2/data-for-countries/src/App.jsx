import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherDetail, setWeatherDetail] = useState(null)
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
  const apikey = import.meta.env.VITE_WEATHER_APIKEY;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => response.data)
        .then((data) => setCountries(data))
    }

    const fetchWeather = async () => {
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital[0]}&appid=${apikey}&units=metric`)
        .then((response) => response.data)
        .then((data) => setWeatherDetail(data))
    }

    if (countries.length == 0) fetchData();
    if (search && (filteredCountries.length == 1 || filteredCountries[0].name.common === search) && filteredCountries[0].capital) fetchWeather();
  }, [search])

  return (
    <>
      <div>
        find countries <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      {filteredCountries.length == 1 || filteredCountries[0].name.common === search ?
        <>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital {filteredCountries[0].capital ? filteredCountries[0].capital[0] : '---'}</p>
          <p>Area {filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {filteredCountries[0].languages ? Object.values(filteredCountries[0].languages).map((value) => <li key={value}>{value}</li>) : '---'}
          </ul>
          <img alt={filteredCountries[0].flags.alt} src={filteredCountries[0].flags.png} />
          <h2>Weather in {filteredCountries[0].capital ? filteredCountries[0].capital[0] : '---'}</h2>
          {weatherDetail &&
            <>
              <p>Temperature {weatherDetail.main ? weatherDetail.main.temp : '---'} Celsius</p>
              <img alt={weatherDetail.weather[0].description} src={`https://openweathermap.org/payload/api/media/file/${weatherDetail.weather[0].icon}.png`} />
              <p>Wind {weatherDetail.wind.speed} m/s</p>
            </>
          }
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
