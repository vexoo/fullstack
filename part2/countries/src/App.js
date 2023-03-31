import './App.css';
import { useState, useEffect } from "react"
import Filter from './components/Filter'
import CountryService from './services/countries'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    CountryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }

  useEffect(hook, [])

  return (
    <div className="app">
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <CountryList countries={countries}
        searchName={searchName} />
    </div>
  );
}

export default App
