import { useState,useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({city}) => {
    const [weather, setWeather] = useState([])
    const KEY = process.env.REACT_APP_API_KEY

    useEffect(() => { 
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    return (weather.main ? (
        <div>
            <h2>Weather in {city}</h2>
            <div>Temperature {weather.main.temp}°C</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather img"/>
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
        ) : null
    )
}

export default WeatherData