import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorColor, setErrorColor] = useState('green')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const personsList = persons.filter(person =>
    person.name.toLowerCase().includes(searchName)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} color={errorColor} />
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h3>add a new entry</h3>
      <PersonForm persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setErrorColor={setErrorColor} />
      <h3>Numbers</h3>
      
      <PersonsList personsList={personsList}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setErrorColor={setErrorColor} />
        
    </div>
  )
}

export default App