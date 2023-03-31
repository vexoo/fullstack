import { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = ({ capital }) => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY

    const [long, setLong] = useState(null)
    const [lat, setLat] = useState(null)

    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${GEO_API_KEY}`
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API_KEY}`


    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(geoURL)
            .then((response) => {
                setLat(response.data[0].lat)
                setLong(response.data[0].lon)
            });
    }, [capital, geoURL]);


    useEffect(() => {
        if ((lat !== null && long !== null)) {
            axios
                .get(weatherURL)
                .then((response) => {
                    setWeather(response.data)
                })
        }
    }, [lat, long, weatherURL]);

    //console.log(weather)
    if (weather.length === 0) {
        return null
    }
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} width="75"/>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )


}

export default WeatherData

