import { useState, useEffect } from 'react'
import Weather from './Weather'

const CountryList = ({ countries, searchName }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase()))

    useEffect(() => {
        if (filteredCountries.length === 0) {
            setSelectedCountry(null);
        }
    }, [filteredCountries, setSelectedCountry]);

    const showCountryDetails = (countryToList) => {
        setSelectedCountry(countryToList)
    }

    const renderCountryDetails = (country) => (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                Capital: {country.capital} <br />
                Area: {country.area}
            </p>
            <p><b>Languages:</b></p>
            <ul>
                {Object.values(country.languages).map((language, i) => (
                    <li key={i}>{language}</li>
                ))}
            </ul>
            <img
                src={country.flags.png}
                alt={country.name.common}
                style={{ border: "1px solid black" }}
                width="150" />
            <Weather capital={country.capital} />
        </div>
    )

    if (filteredCountries.length === 0 && searchName.length > 0) {
        return <div>Could not find a country matching the search</div>
    }

    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        return renderCountryDetails(filteredCountries[0])
    }

    return (
        <div>
            {filteredCountries.map((country) => (
                <li key={country.name.official}>
                    {country.name.common}
                    <button style={{ marginLeft: "10px" }} onClick={() => showCountryDetails(country)}>
                        Details
                    </button>
                </li>
            ))}
            {selectedCountry && renderCountryDetails(selectedCountry)}
        </div>
    )
}

export default CountryList