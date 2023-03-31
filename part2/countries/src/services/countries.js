import axios from "axios"

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//fix for the compiler warning "Assign object to a variable before exporting as module default"
const CountryService = { getAll }

export default CountryService